import { useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import "./App.css";
import Guess from "./Guess";
import GameStore from "./GameStore";
import Qwerty from "./Qwerty";

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

	useEffect(() => {
		document.addEventListener("keyup", keyHandler);
		return () => {
			document.addEventListener("keyup", keyHandler);
		};
	}, [store]);

	return (
		<div className='flex h-screen w-screen items-center justify-center m-0'>
			<div className='card flex flex-col items-center align-middle'>
				<h1 className='text-4xl uppercase font-semibold '>
					Wordle clone
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
				{store.won && <h1>You won!</h1>}
				{store.lost && <h1>You lost!</h1>}
				{(store.won || store.lost) && (
					<button onClick={() => store.init()}>Reset</button>
				)}
				{!(store.won || store.lost) && <Qwerty store={store} />}
			</div>
		</div>
	);
});

export default App;
