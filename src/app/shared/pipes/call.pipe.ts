import { ChangeDetectorRef, EmbeddedViewRef, inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'call',
	standalone: true
})
export class CallPipe<C> implements PipeTransform {
	private readonly context = (inject(ChangeDetectorRef) as EmbeddedViewRef<C>).context;

	transform<T>(fn: (...args: any[]) => T, ...params: unknown[]): T {
		return fn.apply(this.context, [...params]);
	}
}
