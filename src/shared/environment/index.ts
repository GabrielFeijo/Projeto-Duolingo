export const Environment = {
	MAX_SECONDS: Number(process.env.NEXT_PUBLIC_MAX_SECONDS) || 90,
	MAX_WORDS: Number(process.env.NEXT_PUBLIC_MAX_WORDS) || 5,
	WIN_MESSAGE: 'Parabéns! Você conseguiu combinar todas as palavras. ',
	LOSE_MESSAGE:
		'Que pena! O tempo acabou e você não conseguiu combinar todas as palavras. ',
};
