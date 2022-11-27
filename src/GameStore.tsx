import { makeAutoObservable } from "mobx";

const postUrl = "https://words.dev-apis.com/validate-word";

export type StoreType = {
	word: string;
	guesses: string[];
	currentGuess: number;
	won: boolean;
	lost: boolean;
	allGuesses: string[];
	correctGuesses: string[];
	init: () => void;
	setWord: (word: string) => void;
	handleKeyUp: (event: globalThis.KeyboardEvent) => void;
	submitGuess: (guess: string) => void;
	handleQwertyClick: (letter: string) => void;
};

export default {
	word: "",
	guesses: [""],
	currentGuess: 0,

	get won() {
		return this.guesses[this.currentGuess - 1] === this.word;
	},
	get lost() {
		return this.currentGuess === 6;
	},

	get allGuesses() {
		return this.guesses.slice(0, this.currentGuess).join("").split("");
	},
	get correctGuesses() {
		return this.guesses
			.slice(0, this.currentGuess)
			.join("")
			.split("")
			.filter((letter) => this.word.includes(letter));
	},

	init() {
		this.guesses = new Array(6).fill("");
		this.currentGuess = 0;
	},

	setWord(word: string) {
		this.word = word;
	},

	submitGuess() {
		const guess = this.guesses[this.currentGuess];
		fetch(postUrl, {
			method: "POST",
			body: JSON.stringify({ word: guess }),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) =>
			response.json().then((data) => {
				if (data.validWord) {
					this.currentGuess++;
				} else {
					alert("Invalid word!");
				}
			})
		);

		if (this.won || this.lost) {
			console.log("Game over");
		}
	},

	handleKeyUp(ev: globalThis.KeyboardEvent) {
		if (this.won || this.lost) {
			return;
		}
		if (ev.key === "Enter") {
			return this.submitGuess();
		}
		if (ev.key === "Backspace") {
			this.guesses[this.currentGuess] = this.guesses[
				this.currentGuess
			].slice(0, -1);
			return;
		}

		if (
			this.guesses[this.currentGuess].length < this.word.length &&
			ev.key.match(/^[a-z]$/i)
		) {
			this.guesses[this.currentGuess] += ev.key;
			return;
		}
	},
	handleQwertyClick(letter: string) {
		if (this.won || this.lost) {
			return;
		}
		if (this.guesses[this.currentGuess].length < this.word.length) {
			this.guesses[this.currentGuess] += letter;
		}
	},
};
