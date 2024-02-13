import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';

export default function Modal({
	message,
	hits,
	win,
}: {
	message: string;
	hits: number;
	win: boolean;
}) {
	return (
		<div className='fixed z-10 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm'>
			<div className='bg-background w-96 p-4 rounded text-center font-semibold text-sm relative flex items-center flex-col border-2 border-current'>
				<div className='absolute -top-8 bg-current rounded-full'>
					{win ? (
						<CheckIcon className='w-14 h-14 text-secondary' />
					) : (
						<XMarkIcon className='w-14 h-14 text-secondary' />
					)}
				</div>

				<p className='mt-4'>{message}</p>
				<p className='mt-4'>Sua pontuação: {hits}</p>

				<Link
					className={buttonVariants({
						className: 'px-8 mt-4',
						variant: 'outline',
						size: 'icon',
					})}
					href={'/'}
				>
					Voltar
				</Link>
			</div>
		</div>
	);
}
