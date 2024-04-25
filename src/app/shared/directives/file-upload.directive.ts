import { Directive, EventEmitter, HostListener, inject, input, OnDestroy, Output } from '@angular/core';
import { DOCUMENT } from "@angular/common";

@Directive({
	selector: '[appFileUpload]',
	standalone: true
})
export class FileUploadDirective {
	private document = inject(DOCUMENT);

	multipleFiles = input(false);
	accept = input<string>();
	@Output() fileUpload = new EventEmitter<File[]>();

	private inputElement?: HTMLInputElement;

	@HostListener("click")
	onClick() {
		this.requestFileUpload();
	}

	private requestFileUpload() {
		const accept = this.accept();
		this.inputElement = this.document.createElement("input");

		this.inputElement.type = "file";
		this.inputElement.multiple = this.multipleFiles();

		if (accept)
			this.inputElement.accept = accept;

		this.inputElement.click();

		this.inputElement.addEventListener('change', this.onFileAdd);
	}

	private onFileAdd = () => {
		const files = Array.from(this.inputElement?.files ?? []);

		this.fileUpload.emit(files);

		this.inputElement?.removeEventListener('change', this.onFileAdd);
	}
}
