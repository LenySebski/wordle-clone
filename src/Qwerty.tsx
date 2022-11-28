import { observer, useLocalObservable } from "mobx-react-lite";
import { StoreType } from "./GameStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faSquareCheck } from "@fortawesome/free-solid-svg-icons";

type QwertyProps = {
	store: StoreType;
};
export default observer(function Qwerty({ store }: QwertyProps) {
	const gameStore = useLocalObservable(() => store);
	const row1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
	const row2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
	const row3 = ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"];
	return (
		<div className='show-keyboard flex flex-col justify-center content-center   gap-1 grow sm:my-12'>
			<div className='flex justify-center content-center  gap-none sm:gap-1 '>
				{row1.map((letter, index) => {
					const bgColor = gameStore.correctGuesses.includes(
						letter
					)
						? "bg-green-600"
						: gameStore.allGuesses.includes(letter)
						? "bg-black-500 text-opacity-50"
						: "bg-gray-700";
					return (
						<div
							className={`keyboard-letter h-10 w-10 text-lg  sm:text-2xl sm:h-12 sm:w-12 ${bgColor} border-2 rounded-lg border-gray-400 text-white  flex justify-center items-center hover:bg-gray-800  hover:cursor-pointer active:bg-gray-500 active:transition-all`}
							key={`letter-${index}`}
							onClick={() =>
								gameStore.handleQwertyClick(letter)
							}
						>
							{letter}
						</div>
					);
				})}
			</div>
			<div className='flex justify-center content-center  gap-none sm:gap-1'>
				{row2.map((letter, index) => {
					const bgColor = gameStore.correctGuesses.includes(
						letter
					)
						? "bg-green-600"
						: gameStore.allGuesses.includes(letter)
						? "bg-black-500 text-opacity-50"
						: "bg-gray-700";
					return (
						<div
							className={`keyboard-letter  h-10 w-10 text-lg  sm:text-2xl sm:h-12 sm:w-12 ${bgColor} border-2 rounded-lg border-gray-400 text-white  flex justify-center items-center hover:bg-gray-800  hover:cursor-pointer active:bg-gray-500 active:transition-all`}
							key={`letter-${index}`}
							onClick={() =>
								gameStore.handleQwertyClick(letter)
							}
						>
							{letter}
						</div>
					);
				})}
			</div>
			<div className='flex justify-center content-center gap-none sm: gap-none sm:gap-1'>
				{row3.map((letter, index) => {
					if (letter === "backspace") {
						return (
							<div
								className={`letter  h-10 w-14 text-lg  sm:text-2xl sm:h-12 sm:w-20 bg-gray-700 border-2 rounded-lg border-gray-400 text-white flex justify-center items-center hover:bg-gray-800  hover:cursor-pointer active:bg-gray-500 active:transition-all`}
								key={`letter-${index}`}
								onClick={() =>
									gameStore.handleBackspace()
								}
							>
								<FontAwesomeIcon icon={faDeleteLeft} />
							</div>
						);
					}
					if (letter === "enter") {
						return (
							<div
								className={`letter  h-10 w-14 text-lg  sm:text-2xl sm:h-12 sm:w-20 bg-gray-700 border-2 rounded-lg border-gray-400 text-white  flex justify-center items-center hover:bg-gray-800  hover:cursor-pointer active:bg-gray-500 active:transition-all`}
								key={`letter-${index}`}
								onClick={() =>
									gameStore.submitGuess(
										gameStore.guesses[
											gameStore.currentGuess
										]
									)
								}
							>
								<FontAwesomeIcon icon={faSquareCheck} />
							</div>
						);
					}
					const bgColor = gameStore.correctGuesses.includes(
						letter
					)
						? "bg-green-600"
						: gameStore.allGuesses.includes(letter)
						? "bg-black-500 text-opacity-50"
						: "bg-gray-700";
					return (
						<div
							className={`keyboard-letter  h-10 w-10 text-lg  sm:text-2xl sm:h-12 sm:w-12 ${bgColor} border-2 rounded-lg border-gray-400 text-white flex justify-center items-center hover:bg-gray-800  hover:cursor-pointer active:bg-gray-500 active:transition-all`}
							key={`letter-${index}`}
							onClick={() =>
								gameStore.handleQwertyClick(letter)
							}
						>
							{letter}
						</div>
					);
				})}
			</div>
		</div>
	);
});
