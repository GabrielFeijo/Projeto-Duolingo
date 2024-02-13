'use client';
import Card from '@/components/card';
import Header from '@/components/header';
import { Progress } from '@/components/ui/progress';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { words } from '../../../words';
import { Environment } from '@/shared/environment';
import Modal from '@/components/modal';

type languageType = 'pt' | 'en';

const Page = () => {
	const [time, setTime] = useState(Environment.MAX_SECONDS);

	const [selectedIndex, setSelectedIndex] = useState<
		{
			originalIdx: number;
			shuffledIdx: number;
			language: languageType;
		}[]
	>([]);
	const [gameHistory, setGameHistory] = useState<{
		hits: number;
		wordsIndex: number;
		selectedCards: string[];
	}>({ hits: 0, wordsIndex: 0, selectedCards: [] });
	const [modal, setModal] = useState<{
		win: boolean;
		modalMessage: string;
	}>({ win: false, modalMessage: '' });
	const [shuffledPairs, setShuffledPairs] = useState<{
		pt: string[];
		en: string[];
	}>();

	useEffect(() => {
		setShuffledPairs({
			pt: shuffleArray(words.pt.slice(0, Environment.MAX_WORDS)),
			en: shuffleArray(words.en.slice(0, Environment.MAX_WORDS)),
		});
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (time > 0) {
				setTime(time - 1);
			}
		}, 1000);

		if (gameHistory.wordsIndex === words.pt.length) {
			setModal({
				modalMessage: Environment.WIN_MESSAGE,
				win: true,
			});
		} else if (time == 0) {
			setModal({
				modalMessage: Environment.LOSE_MESSAGE,
				win: false,
			});
		}

		return () => clearTimeout(timer);
	}, [gameHistory.wordsIndex, time]);

	const shuffleArray = (array: string[]) => {
		const shuffledArray = [...array];

		for (let i = shuffledArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledArray[i], shuffledArray[j]] = [
				shuffledArray[j],
				shuffledArray[i],
			];
		}

		return shuffledArray;
	};

	const handleCardClick = (
		text: string,
		indexC: number,
		language: languageType
	) => {
		if (gameHistory.selectedCards.includes(text)) {
			return;
		}

		const indexCard = words[language].indexOf(text);
		const cards = [...gameHistory.selectedCards, text];

		if (cards.length >= 2) {
			if (shuffledPairs) {
				if (selectedIndex[0].originalIdx === indexCard) {
					const newShuffledPairs: { pt: string[]; en: string[] } = {
						...shuffledPairs,
					};
					const removedIndex = selectedIndex[0].shuffledIdx;

					newShuffledPairs[selectedIndex[0].language][removedIndex] = '';
					newShuffledPairs[language][indexC] = '';

					setTimeout(() => {
						newShuffledPairs[selectedIndex[0].language][removedIndex] =
							words[selectedIndex[0].language][
								Environment.MAX_WORDS + gameHistory.wordsIndex
							];
						newShuffledPairs[language][indexC] =
							words[language][Environment.MAX_WORDS + gameHistory.wordsIndex];
					}, 2000);

					setGameHistory((prevState) => ({
						hits: prevState.hits + 1,
						wordsIndex: prevState.wordsIndex + 1,
						selectedCards: [],
					}));
				} else {
					setGameHistory((prevState) => ({
						...prevState,
						hits: 0,
						selectedCards: [],
					}));
				}
			}
			setSelectedIndex([]);
		} else {
			setSelectedIndex((prevState) => [
				...prevState,
				{ language, originalIdx: indexCard, shuffledIdx: indexC },
			]);

			setGameHistory((prevState) => ({
				...prevState,
				selectedCards: cards,
			}));
		}
	};

	return (
		<>
			{modal.modalMessage && (
				<Modal
					message={modal.modalMessage}
					hits={gameHistory.wordsIndex}
					win={modal.win}
				/>
			)}

			<div className='max-w-md m-auto h-screen px-4 flex justify-center flex-col'>
				<div className='flex flex-col gap-4'>
					<Header time={time} />
					<Progress value={(gameHistory.wordsIndex / words.pt.length) * 100} />
					<h1 className='font-semibold text-2xl'>Combine os pares: </h1>

					<div
						className={`flex items-center gap-1 ${
							gameHistory.hits == 0
								? 'text-accentColor'
								: ' text-green-500 dark:text-green-300'
						} `}
					>
						<InformationCircleIcon className='w-4 h-4' />
						<p className='uppercase font-semibold text-xs'>
							combo x{gameHistory.hits}
						</p>
					</div>
				</div>

				{shuffledPairs && (
					<main className='my-10 gap-4 flex justify-between w-full'>
						{['pt', 'en'].map((language) => (
							<div
								className='flex flex-col w-full gap-4'
								key={language}
							>
								{shuffledPairs[language as languageType].map(
									(word: string, index: number) => (
										<div key={index}>
											<Card
												text={word}
												handleClick={() =>
													handleCardClick(word, index, language as languageType)
												}
												opacity={word?.length == 0}
												selectedWord={gameHistory.selectedCards.includes(word)}
											/>
										</div>
									)
								)}
							</div>
						))}
					</main>
				)}
			</div>
		</>
	);
};

export default Page;
