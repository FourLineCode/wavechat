import clsx from 'clsx';

interface Props {
	className?: string;
	children?: React.ReactNode;
}

export const Card = ({ className, children }: Props) => {
	return <div className={clsx(className, 'p-4 rounded-lg bg-dark-700')}>{children}</div>;
};
