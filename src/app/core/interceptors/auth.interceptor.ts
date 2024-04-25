import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const token = inject(AuthenticationService).token();

	let newReq: HttpRequest<any> = req;

	if(token) {
		newReq = req.clone({
			headers: req.headers.set("Authorization", `Bearer ${token}`)
		});
	}

	return next(newReq);
};
