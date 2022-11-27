import { observer, useLocalObservable } from "mobx-react-lite";
import { StoreType } from "./GameStore";

type QwertyProps = {
	store: StoreType;
};
export default observer(function Qwerty({ store }: QwertyProps) {
	const gameStore = useLocalObservable(() => store);
	const qwerty = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
	console.log(gameStore.allGuesses, "all guesses");
	console.log(gameStore.correctGuesses, "correct guesses");
	return (
		<div>
			{qwerty.map((row, index) => {
				return (
					<div
						className='flex justify-center content-center gap-x-2 m-2'
						key={`keyboardRow-${index}`}
					>
						{row.split("").map((letter, index) => {
							const bgColor =
								gameStore.correctGuesses.includes(
									letter
								)
									? "bg-green-600"
									: gameStore.allGuesses.includes(
											letter
									  )
									? "bg-black-500 text-opacity-50"
									: "bg-gray-700";
							return (
								<div
									className={`letter h-12 w-12 ${bgColor} border-2 rounded-lg border-gray-400 text-white text-2xl flex justify-center items-center  hover:cursor-pointer`}
									key={`letter-${index}`}
									onClick={() =>
										gameStore.handleQwertyClick(
											letter
										)
									}
								>
									{letter}
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
});
