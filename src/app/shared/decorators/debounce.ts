export function Debounce(timeout: number) {
	let timeoutRef: NodeJS.Timeout | null = null;

	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const original = descriptor.value;

		descriptor.value = function debounce(...args: any[]) {
			if (timeoutRef) clearTimeout(timeoutRef);

			timeoutRef = setTimeout(() => {
				original.apply(this, args);
			}, timeout);
		};

		return descriptor;
	};
}
