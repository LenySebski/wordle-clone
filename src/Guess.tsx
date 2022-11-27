export type GuessProps = {
	word: string;
	guess: string;
	row: number;
	isGuessed: boolean;
	currentGuess: number;
};

export default function Guess({ word, guess, row, isGuessed }: GuessProps) {
	return (
		<div className='flex gap-x-2 m-2'>
			{word.split("").map((_, index) => {
				const bgColor = !isGuessed
					? "bg-black"
					: guess[index] === word[index]
					? "bg-green-600 flip"
					: word.includes(guess[index])
					? "bg-yellow-600 flip"
					: "bg-red-600 flip";
				return (
					<div
						className={
							"guess-letter h-14 w-14 rounded-md  border-2 border-gray-400 text-white text-4xl flex justify-center items-center uppercase " +
							bgColor
						}
						key={`row${row}-letter${index}`}
					>
						{guess[index] || ""}
					</div>
				);
			})}
		</div>
	);
}
