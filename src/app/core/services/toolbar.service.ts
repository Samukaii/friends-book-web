import { computed, DestroyRef, effect, inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from "@angular/router";
import { filter, map } from "rxjs";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { isAtBrowser } from "./authentication.service";

type Generic = Record<string, any>;

const collectRouteData = (router: Router): Generic => {
	let data = {};

	let stack: ActivatedRouteSnapshot[] = [router.routerState.snapshot.root];

	while (stack.length > 0) {
		const route = stack.pop()!;
		data = {...data, ...route.data};
		stack.push(...route.children);
	}
	return data;
}


export const getRouteData = () => {
	const router = inject(Router);

	const watchRouter$ =  router.events.pipe(
		filter(type => type instanceof NavigationEnd),
		map(() => collectRouteData(router)),
		takeUntilDestroyed()
	);

	return toSignal(watchRouter$, {
		initialValue: collectRouteData(router)
	});
}


@Injectable({
	providedIn: 'root'
})
export class ToolbarService {
}
