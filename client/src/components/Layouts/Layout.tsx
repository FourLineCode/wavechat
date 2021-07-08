import Head from 'next/head';
import React from 'react';
import { config } from 'src/internal/config';

export interface Props {
	children?: React.ReactNode;
	title?: string;
	desc?: string;
}

export const Layout = ({
	children,
	title = 'WaveChat',
	desc = 'Wave | New way of communication',
}: Props) => (
	<main>
		<Head>
			<title>{title} | WaveChat</title>
			<meta charSet='utf-8' />
			<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			<meta name='description' content={desc} />
			<link rel='shortcut icon' href={config.iconUrl} type='image/x-icon' />
		</Head>
		{children}
	</main>
);
