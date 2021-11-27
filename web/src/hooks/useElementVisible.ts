import React, { useEffect, useState } from "react";

export function useElementVisible<T extends HTMLElement>(
	ref: React.RefObject<T>,
	rootMargin = "-10px"
) {
	const [isIntersecting, setIntersecting] = useState(false);
	const observer = new IntersectionObserver(
		([entry]) => {
			console.log("int", entry.isIntersecting);
			setIntersecting(entry.isIntersecting);
		},
		{
			rootMargin,
		}
	);

	useEffect(() => {
		ref.current && observer.observe(ref.current);

		return () => {
			observer.disconnect();
		};
	}, []);

	return isIntersecting;
}
