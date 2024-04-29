import { ChangeDetectorRef, Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';
import { Button } from "primeng/button";
import { ButtonAutoLoadingService } from "../../core/services/button-auto-loading.service";
import { ButtonAutoLoading } from "../models/button-auto-loading";

@Directive({
	selector: '[appAutoLoading]',
	standalone: true
})
export class ButtonAutoLoadingDirective implements ButtonAutoLoading{
	private component = inject(Button);
	private detector = inject(ChangeDetectorRef);
	private service = inject(ButtonAutoLoadingService);
	private element = inject(ElementRef).nativeElement;
	private renderer = inject(Renderer2);

	@HostListener('click')
	onClick() {
		this.service.setLastClickedButton(this);
	}

	loading(enabled: boolean) {
		this.component.loading = enabled;
		this.detector.markForCheck();

		if(enabled) this.renderer.setStyle(this.element, 'pointerEvents', 'none');
		else this.renderer.setStyle(this.element, 'pointerEvents', 'auto');
	}
}
