import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { LoginPayload } from "./models/login-payload";
import { LoginResponse } from "./models/login-response";
import { switchMap, tap } from "rxjs";
import { AuthenticationService } from "../../core/services/authentication.service";
import { Router } from "@angular/router";
import { CurrentUserService } from "../../core/services/current-user.service";
import { fromPromise } from "rxjs/internal/observable/innerFrom";

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	private http = inject(HttpClient);
	private router = inject(Router);
	private authentication = inject(AuthenticationService);
	private currentUserService = inject(CurrentUserService);

	login(info: LoginPayload) {
		return this.http.post<LoginResponse>(`${environment.api}/auth/login`, info).pipe(
			tap((response) => this.authentication.saveCredentials(response)),
			switchMap(() => fromPromise(this.currentUserService.refreshUser())),
			tap(() => this.router.navigate(["posts"]))
		)
	}
}
