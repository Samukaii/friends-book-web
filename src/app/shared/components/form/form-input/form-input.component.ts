import { Component, computed, effect, forwardRef, input } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	FormsModule,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule
} from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { filter, map, of } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { AsyncPipe } from "@angular/common";
import { Generic } from "../../../../core/services/toolbar.service";


const errorMessages = {
	required: "Este campo é obrigatório",
	email: "Este e-mail é inválido",
};

const getMessageError = (errors: Generic) => {
	if(errors["customError"]) return errors["customError"] ?? '';

	const entries = Object.entries(errorMessages);

	for (const [key, message] of entries) {
		if(errors[key]) return message;
	}
}


const watchErrorMessage = (control: AbstractControl) => {
	return control.statusChanges.pipe(
		map((status) => {
			if(status === "INVALID") return getMessageError(control.errors ?? {});
			if(status === "VALID") return "";
		})
	);
}

@Component({
	selector: 'app-form-input',
	standalone: true,
	imports: [
		FormsModule,
		InputTextModule,
		ReactiveFormsModule,
		AsyncPipe
	],
	templateUrl: './form-input.component.html',
	styleUrl: './form-input.component.scss'
})
export class FormInputComponent {
	type = input("text");
	name = input.required<string>();
	form = input.required<FormGroup>();
	label = input<string>();
	placeholder = input<string>();

	control = computed(() => this.form().get(this.name()));

	errorMessage = "";

	watchMessageErrors = effect((onCleanup) => {
		const control = this.control();

		const sub = watchErrorMessage(control!).subscribe(message => {
			this.errorMessage = message;
		});

		onCleanup(() => {
			sub?.unsubscribe();
		});
	})
}
