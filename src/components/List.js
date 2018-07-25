import * as React from "react";
import { Link } from "react-router-dom";

class WordList extends React.Component {
	state = {
		currentWord: {},
	};
	componentDidMount() {
		this.getCurrentWord();
	}
	getCurrentWord = () => {
        const { currentChild, wordList } = this.props;
		const hasCompletedAnyWords = currentChild.completed.length > 0;
        let nextWord;
        
        console.log(currentChild)

		if (!hasCompletedAnyWords) {
			// If no completed words start at first word
			nextWord = wordList.filter(word => word.sequence === 1)[0];
		} else {
			const lastKnownWords = [];
			currentChild.completed.map(wordId => {
				const foundWord = wordList.filter(
					word => word.id === wordId
				)[0];
				if (foundWord) {
					lastKnownWords.push(foundWord);
				}
			});
			const nextSequence =
				lastKnownWords.sort((a, b) => a.sequence < b.sequence)[0]
					.sequence + 1;
			nextWord = wordList.filter(
				word => word.sequence === nextSequence
			)[0];
		}

		const completed =
			currentChild.completed.filter(wordId => wordId === nextWord.id)
				.length > 0;

		this.setState({
			currentWord: {
				...nextWord,
				completed,
			},
		});
	};
	goBackOneWord = () => {
		const { wordList, currentChild } = this.props;
		const { currentWord } = this.state;

		const nextWord = wordList.filter(
			word => word.sequence === currentWord.sequence - 1
		)[0];

		const completed =
			currentChild.completed.filter(wordId => wordId === nextWord.id)
				.length > 0;

		this.setState({
			currentWord: {
				...nextWord,
				completed,
			},
		});
	};
	getNextWord = () => {
		const { wordList, currentChild } = this.props;
		const { currentWord } = this.state;

		const nextWord = wordList.filter(
			word => word.sequence === currentWord.sequence + 1
		)[0];

		const completed =
			currentChild.completed.filter(wordId => wordId === nextWord.id)
				.length > 0;

		this.setState({
			currentWord: { ...nextWord, completed },
		});
	};
	handleCompleteChange = e => {
		const { editChildProfile, currentChild } = this.props;
		const { currentWord } = this.state;

		this.setState({
			currentWord: {
				...currentWord,
				completed: !currentWord.completed,
			},
		});

		// add completed word to childs profile
		const profileClone = { ...currentChild };

		if (currentWord.completed) {
			profileClone.completed = [
				...currentChild.completed.filter(
					wordId => wordId !== currentWord.id
				),
			];
		} else {
			profileClone.completed = [
				...currentChild.completed,
				currentWord.id,
			];
        }
        
		editChildProfile(profileClone);
	};
	render() {
		const { currentWord } = this.state;
		return (
			<div>
				<h1>{currentWord.word}</h1>

				<label>
					Complete
					<input
						type="checkbox"
						checked={currentWord.completed}
						onChange={this.handleCompleteChange}
					/>
				</label>

				<br />
				<br />

				<button
					onClick={this.goBackOneWord}
					disabled={currentWord.sequence === 1}
				>
					Go back one word
				</button>
				{" | "}
				<button
					onClick={this.getNextWord}
					disabled={currentWord.sequence === 999}
				>
					Next Word
				</button>
			</div>
		);
	}
}

export default WordList;
