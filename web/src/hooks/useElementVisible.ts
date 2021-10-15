import React, { useEffect, useState } from 'react';

export function useElementVisible<T extends HTMLElement>(
	ref: React.RefObject<T>,
	rootMargin = '0px'
) {
	const [isIntersecting, setIntersecting] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIntersecting(entry.isIntersecting);
			},
			{
				rootMargin,
			}
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			if (ref.current) {
				observer.unobserve(ref.current);
			}
		};
	}, []);

	return isIntersecting;
}
