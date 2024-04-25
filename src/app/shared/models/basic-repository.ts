import { Signal } from "@angular/core";

export interface BasicRepository<T> {
	data: Signal<T[]>;
	loading: Signal<boolean>;
	fetch: (...args: any[]) => void;
}
