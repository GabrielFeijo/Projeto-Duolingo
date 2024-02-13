import { ModeToggle } from '@/components/mode-toogle';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { buttonVariants } from './ui/button';
import Counter from './counter';
import Link from 'next/link';

export default function Header({ time }: { time: number }) {
	return (
		<header className='flex items-center justify-between w-full '>
			<Link
				className={buttonVariants({
					className: 'border-0',
					variant: 'outline',
					size: 'icon',
				})}
				href={'/'}
			>
				<XMarkIcon className='w-8 h-8' />
			</Link>
			<ModeToggle />
			<Counter time={time} />
		</header>
	);
}
