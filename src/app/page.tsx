import { ModeToggle } from '@/components/mode-toogle';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
	return (
		<div className='flex justify-center items-center h-screen flex-col gap-4 px-4'>
			<header>
				<ModeToggle />
			</header>

			<h1 className='text-2xl font-semibold text-center'>
				Pratique seu vocabulário em inglês
			</h1>
			<Link
				className={buttonVariants({
					className: 'uppercase font-semibold',
				})}
				href={'/play'}
			>
				Começar agora +10 xp
			</Link>
		</div>
	);
}
