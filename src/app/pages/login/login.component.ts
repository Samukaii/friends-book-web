import { Component, inject } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginPayload } from "./models/login-payload";
import { LoginService } from "./login.service";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { NgOptimizedImage } from "@angular/common";
import { RouterLink } from "@angular/router";
import { value } from "../register/register.component";

@Component({
  selector: 'app-login',
  standalone: true,
	imports: [
		MatLabel,
		MatFormField,
		MatInput,
		MatButton,
		FormsModule,
		ReactiveFormsModule,
		CheckboxModule,
		InputTextModule,
		ButtonModule,
		RippleModule,
		NgOptimizedImage,
		RouterLink
	],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
	form = inject(FormBuilder).nonNullable.group({
		login: [value<string>(), [Validators.required, Validators.email]],
		password: [value<string>(), [Validators.required, Validators.minLength(8)]],
	});

	service = inject(LoginService);

	onSubmit() {
		const payload = this.form.getRawValue();

		this.service.login(payload).subscribe();
	}
}
