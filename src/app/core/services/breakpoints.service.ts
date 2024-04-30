import { DestroyRef, inject, Injectable, signal } from '@angular/core';

const matchQuery = (query: string) => {
	const destroyRef = inject(DestroyRef);

	const media = matchMedia(query);
	const isMatching = signal(matchMedia(query).matches);

	const onMatch = () => {
		isMatching.set(media.matches);
	};

	media.addEventListener('change', onMatch);

	destroyRef.onDestroy(() => {
		media.removeEventListener('change', onMatch);
	});

	return isMatching;
};

@Injectable({
	providedIn: 'root'
})
export class BreakpointsService {
	isSmallScreen = matchQuery("(max-width: 1600px)");
}
