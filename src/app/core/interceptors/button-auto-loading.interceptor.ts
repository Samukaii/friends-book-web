import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { ButtonAutoLoadingService } from "../services/button-auto-loading.service";
import { filter, tap } from "rxjs";

export const buttonAutoLoadingInterceptor: HttpInterceptorFn = (req, next) => {
	const loadingService = inject(ButtonAutoLoadingService);

	let newReq: HttpRequest<any> = req;

	loadingService.registerRequest(req);

	return next(newReq).pipe(
		filter((event): event is HttpResponse<any> => event instanceof HttpResponse),
		tap(response => loadingService.registerResponse(response))
	)
};
