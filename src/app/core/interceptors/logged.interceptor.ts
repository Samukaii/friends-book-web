import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { Router } from "@angular/router";
import { filter, tap } from "rxjs";

enum HTTP_STATUS {
	UNKNOWN = 0,
	UNAUTHORIZED = 401
}

const isError = (error: unknown): error is HttpErrorResponse => {
	return error instanceof HttpErrorResponse;
};

export const loggedInterceptor: HttpInterceptorFn = (req, next) => {
	const authenticationService = inject(AuthenticationService);

	return next(req).pipe(
		tap({
			error: error => {
				if(!isError(error)) return;

				if(error.status === HTTP_STATUS.UNKNOWN || error.status === HTTP_STATUS.UNAUTHORIZED)
					authenticationService.logout();
			}
		})
	)
};
