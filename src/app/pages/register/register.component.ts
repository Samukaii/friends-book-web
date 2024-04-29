import { Component, computed, inject, signal } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import { NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {RouterLink} from "@angular/router";
import { FileSelectEvent, FileUploadEvent, FileUploadModule, UploadEvent } from "primeng/fileupload";
import { CallPipe } from "../../shared/pipes/call.pipe";
import { RegisterService } from "./register.service";
import { passwordConfirmationValidator } from "../../shared/validators/password-confirmation-validator";
import { FormInputComponent } from "../../shared/components/form/form-input/form-input.component";
import { ButtonAutoLoadingDirective } from "../../shared/directives/button-auto-loading.directive";

export const value = <T>(initialValue: any = null) => initialValue as T;
const nullableValue = <T>(initialValue: any = null) => initialValue as T | null;

@Component({
  selector: 'app-register',
  standalone: true,
	imports: [
		ButtonModule,
		InputTextModule,
		NgOptimizedImage,
		PaginatorModule,
		ReactiveFormsModule,
		RippleModule,
		RouterLink,
		FileUploadModule,
		NgForOf,
		NgIf,
		CallPipe,
		FormInputComponent,
		ButtonAutoLoadingDirective
	],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
	service = inject(RegisterService);

	form = inject(FormBuilder).nonNullable.group({
		name: [value<string>(), Validators.required],
		surname: [value<string>(), Validators.required],
		nickname: [value<string>(), Validators.required],
		email: [value<string>(), [Validators.required, Validators.email]],
		password: [value<string>(), Validators.required],
		passwordConfirmation: [value<string>(), [
			Validators.required,
			passwordConfirmationValidator("password")
		]],
	});

	onSubmit() {
		this.service.register(this.form.getRawValue()).subscribe();
	}
}
