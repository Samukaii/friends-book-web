import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";

export const nonAuthenticatedGuard: CanActivateFn = () => {
	const service = inject(AuthenticationService);
	const router = inject(Router);

	if(!service.isLogged()) return true;

	router.navigate(['posts']);

	return false;
};
