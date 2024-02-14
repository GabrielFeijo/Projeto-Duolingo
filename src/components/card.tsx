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
			className={` py-8 transition-opacity duration-1000 border ${
				selectedWord
					? `text-secondary hover:text-secondary `
					: `bg-secondary text-current hover:bg-secondary`
			} w-full ${opacity ? 'opacity-0' : 'opacity-100'} `}
			onClick={handleClick}
		>
			{text}
		</Button>
	);
}
