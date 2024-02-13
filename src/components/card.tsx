import { Button } from './ui/button';

export default function Card({
	text,
	selectedWord,
	handleClick,
	opacity = false,
}: {
	text: string;
	selectedWord?: boolean;
	handleClick?: () => void;
	opacity?: boolean;
}) {
	return (
		<Button
			variant='outline'
			className={`py-8 transition-all duration-1000 border-2 ${
				selectedWord && ` dark:border-white border-slate-900 `
			} w-full ${opacity ? 'opacity-0' : 'opacity-100'}`}
			onClick={handleClick}
		>
			{text}
		</Button>
	);
}
