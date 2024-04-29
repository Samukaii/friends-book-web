import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { ButtonAutoLoadingService } from "../services/button-auto-loading.service";
import { filter, tap } from "rxjs";
import { debug } from "node:util";

export const buttonAutoLoadingInterceptor: HttpInterceptorFn = (req, next) => {
	const loadingService = inject(ButtonAutoLoadingService);

	let newReq: HttpRequest<any> = req;

	loadingService.registerRequest(req);

	return next(newReq).pipe(
		tap((event) => console.log(event)),
		tap({
			error: error => {
				if(error instanceof HttpErrorResponse) {
					loadingService.registerResponse(error);
				}
			},
			next: event => {
				if(event instanceof HttpResponse) {
					loadingService.registerResponse(event);
				}
			}
		})
	)
};
