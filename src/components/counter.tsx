import { Environment } from '@/shared/environment';
import { ClockIcon } from '@heroicons/react/24/outline';

export default function Counter({ time }: { time: number }) {
	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
	};

	let textColorClass = 'text-red-500 dark:text-red-300';

	if (time > Environment.MAX_SECONDS / 1.5) {
		textColorClass = 'text-green-500 dark:text-green-300';
	} else if (time > Environment.MAX_SECONDS / 2.5) {
		textColorClass = 'text-yellow-500 dark:text-yellow-300';
	}

	return (
		<div className={`flex items-center justify-center gap-2 ${textColorClass}`}>
			<ClockIcon className='w-5 h-5' />
			<p>{formatTime(time)}</p>
		</div>
	);
}
