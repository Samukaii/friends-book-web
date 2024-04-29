import { ValidatorFn } from "@angular/forms";

export const passwordConfirmationValidator = (passwordFieldName: string): ValidatorFn => field => {
	const otherField = field.root.get(passwordFieldName);

	if(otherField?.value === field.value)
		return null;

	return {
		customError: "As senhas não coincidem"
	};
};
