import { useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import "./App.css";
import Guess from "./Guess";
import GameStore from "./GameStore";
import Qwerty from "./Qwerty";
import { faNetworkWired } from "@fortawesome/free-solid-svg-icons";

const App = observer(() => {
	const store = useLocalObservable(() => GameStore);

	function keyHandler(this: Document, event: globalThis.KeyboardEvent) {
		store.handleKeyUp(event);
	}

	useEffect(() => {
		store.init();
		fetch("https://words.dev-apis.com/word-of-the-day")
			.then((response) => {
				return response.json();
			})
			.then((data) => store.setWord(data.word));
	}, []);

	function randomWord() {
		store.init();
		fetch("https://words.dev-apis.com/word-of-the-day?random=1")
			.then((response) => {
				return response.json();
			})
			.then((data) => store.setWord(data.word));
	}

	useEffect(() => {
		document.addEventListener("keyup", keyHandler);
		return () => {
			document.addEventListener("keyup", keyHandler);
		};
	}, [store]);

	return (
		<div className=' h-screen w-screen overflow-hidden'>
			<div className='card h-4/5 flex flex-col'>
				<div className='grow flex flex-col items-center align-middle justify-center'>
					<h1 className='show-title font-bebas text-6xl uppercase font-semibold my-8  md:my-10'>
						Word puzzle
					</h1>
					{store.guesses.map((_, index) => {
						return (
							<Guess
								word={store.word}
								guess={store.guesses[index]}
								row={index}
								isGuessed={index < store.currentGuess}
								currentGuess={store.currentGuess}
								key={`row-${index}`}
							/>
						);
					})}
					{store.won && (
						<h1 className='win mt-6 mb-2 font-bebas'>
							You won!
						</h1>
					)}
					{store.lost && (
						<h1 className='lose mt-6 mb-2 font-bebas'>
							You lost!
						</h1>
					)}
				</div>
				{(store.won || store.lost) && (
					<div className='flex flex-col items-center justify-start gap-4 grow mb-12'>
						<div
							className='w-1/2 sm:w-56 slide-up font-bebas text-2xl uppercase font-semibold bg-gray-700 text-white rounded-md py-2 px-4 border border-gray-400 hover:bg-gray-800 text-center cursor-pointer active:bg-gray-400'
							onClick={() => store.init()}
						>
							Reset
						</div>
						<div
							className='w-1/2 sm:w-56 slide-up font-bebas text-2xl uppercase font-semibold bg-gray-700 text-white rounded-md py-2 px-4 border border-gray-400 hover:bg-gray-800 text-center cursor-pointer active:bg-gray-400'
							onClick={() => randomWord()}
						>
							New word
						</div>
					</div>
				)}
				{store.guesses.length > 1 && !(store.won || store.lost) && (
					<Qwerty store={store} />
				)}
			</div>
		</div>
	);
});

export default App;
