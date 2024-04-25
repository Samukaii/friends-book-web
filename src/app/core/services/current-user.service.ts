import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { User } from "../../shared/models/user";
import { LoginResponse } from "../../pages/login/models/login-response";
import { isPlatformBrowser } from "@angular/common";
import { Router } from "@angular/router";
import { AuthenticationService, injectLocalStorage } from "./authentication.service";
import { UsersService } from "../../pages/my-profile/users.service";
import { firstValueFrom, retry } from "rxjs";


@Injectable({
	providedIn: 'root'
})
export class CurrentUserService {
	private authentication = inject(AuthenticationService);
	private usersService = inject(UsersService);
	private storage = injectLocalStorage();
	private storageKey = "current-user";
	private loggedUser = signal<User | null>(this.getSavedUser());

	private saveOnLocalStorage = effect(() => {
		const logged = this.loggedUser();

		if(logged) this.storage?.setItem(this.storageKey, JSON.stringify(logged));
	});

	user = computed(() => this.loggedUser());

	isCurrentUser(userId: number) {
		return this.user()?.id === userId;
	}

	async refreshUser() {
		try {
			this.loggedUser.set(await firstValueFrom(this.usersService.validateCurrentUser()));
		}
		catch (error) {
			this.storage?.removeItem(this.storageKey);
			this.authentication.logout();
		}
	}

	private getSavedUser() {
		const stored = this.storage?.getItem(this.storageKey);

		if(!stored) return null;

		return JSON.parse(stored) as User;
	}
}
