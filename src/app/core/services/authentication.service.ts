import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { User } from "../../shared/models/user";
import { LoginResponse } from "../../pages/login/models/login-response";
import { isPlatformBrowser } from "@angular/common";
import { Router } from "@angular/router";
import { LoginPayload } from "../../pages/login/models/login-payload";
import { environment } from "../../../environments/environment";
import { tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { CurrentUserService } from "./current-user.service";

export const isAtBrowser = () => {
	const platform = inject(PLATFORM_ID);

	return isPlatformBrowser(platform);
}

export const injectLocalStorage = (): Storage | null => {
	if(!isAtBrowser()) return null;

	return localStorage;
}


@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	private storageKey = "token";
	private storage = injectLocalStorage();
	private router = inject(Router);
	token = signal<string | null>(this.getSavedToken());

	private saveOnLocalStorage = effect(() => {
		const token = this.token();

		if(!token) this.storage?.removeItem(this.storageKey);
		else this.storage?.setItem(this.storageKey, JSON.stringify(this.token()));
	});


	isLogged = computed(() => !!this.token());

	saveCredentials(credentials: LoginResponse) {
		this.token.set(credentials.token);
		this.storage?.setItem(this.storageKey, credentials.token);
	}

	logout() {
		this.token.set(null);

		this.router.navigate(["login"]);
	}

	private getSavedToken() {
		const saved = this.storage?.getItem(this.storageKey);

		if(!saved) return null;

		return JSON.parse(saved) as string;
	}
}
