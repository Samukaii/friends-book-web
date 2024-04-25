import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { RegisterPayload } from "./models/register-payload";
import { LoginResponse } from "./models/login-response";
import { tap } from "rxjs";
import { AuthenticationService } from "../../core/services/authentication.service";
import { Router } from "@angular/router";
import { User } from "../../shared/models/user";

@Injectable({
	providedIn: 'root'
})
export class RegisterService {
	http = inject(HttpClient);
	router = inject(Router);

	register(info: RegisterPayload) {
		return this.http.post<User>(`${environment.api}/auth/register`, info).pipe(
			tap(() => this.router.navigate(["login"]))
		)
	}
}
