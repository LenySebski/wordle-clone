import { observer, useLocalObservable } from "mobx-react-lite";
import { StoreType } from "./GameStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faSquareCheck } from "@fortawesome/free-solid-svg-icons";

type QwertyProps = {
	store: StoreType;
};
export default observer(function Qwerty({ store }: QwertyProps) {
	const gameStore = useLocalObservable(() => store);
	const row1 = [
		"q",
		"w",
		"e",
		"r",
		"t",
		"y",
		"u",
		"i",
		"o",
		"p",
		"backspace",
	];
	const row2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l", "enter"];
	const row3 = ["z", "x", "c", "v", "b", "n", "m"];
	return (
		<div className='flex flex-col justify-center content-center gap-1  mb-4 sm:mb-12'>
			<div className='flex justify-center content-center gap-1 '>
				{row1.map((letter, index) => {
					if (letter === "backspace") {
						return (
							<div
								className={`letter  h-7 w-7 text-sm  sm:text-2xl sm:h-12 sm:w-12 bg-gray-700 border-2 rounded-lg border-gray-400 text-white flex justify-center items-center  hover:cursor-pointer `}
								key={`letter-${index}`}
								onClick={() =>
									gameStore.handleBackspace()
								}
							>
								<FontAwesomeIcon icon={faDeleteLeft} />
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
							className={`keyboard-letter h-7 w-7 text-sm  sm:text-2xl sm:h-12 sm:w-12 ${bgColor} border-2 rounded-lg border-gray-400 text-white  flex justify-center items-center  hover:cursor-pointer`}
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
			<div className='flex justify-center content-center gap-1'>
				{row2.map((letter, index) => {
					if (letter === "enter") {
						return (
							<div
								className={`letter  h-7 w-7 text-sm  sm:text-2xl sm:h-12 sm:w-12 bg-gray-700 border-2 rounded-lg border-gray-400 text-white  flex justify-center items-center  hover:cursor-pointer`}
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
							className={`keyboard-letter  h-7 w-7 text-sm  sm:text-2xl sm:h-12 sm:w-12 ${bgColor} border-2 rounded-lg border-gray-400 text-white  flex justify-center items-center  hover:cursor-pointer`}
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
			<div className='flex justify-center content-center gap-1'>
				{row3.map((letter, index) => {
					const bgColor = gameStore.correctGuesses.includes(
						letter
					)
						? "bg-green-600"
						: gameStore.allGuesses.includes(letter)
						? "bg-black-500 text-opacity-50"
						: "bg-gray-700";
					return (
						<div
							className={`keyboard-letter  h-7 w-7 text-sm  sm:text-2xl sm:h-12 sm:w-12 ${bgColor} border-2 rounded-lg border-gray-400 text-white flex justify-center items-center  hover:cursor-pointer`}
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
