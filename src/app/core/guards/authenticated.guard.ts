import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthenticationService, isAtBrowser } from "../services/authentication.service";

export const authenticatedGuard: CanActivateFn = () => {
	const service = inject(AuthenticationService);
	const router = inject(Router);

	if(service.isLogged() || !isAtBrowser()) return true;

	router.navigate(['login']);

	return false;
};
