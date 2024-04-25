import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { User } from "../../shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
	private http = inject(HttpClient);

	getFollowers(userId: number) {
		return this.http.get<User[]>(this.url(`${userId}/followers`));
	}

	getFollowing(userId: number) {
		return this.http.get<User[]>(this.url(`${userId}/following`));
	}

	changeProfilePhoto(userId: number, file: File) {
		const body = new FormData();
		body.append("profile", file);

		return this.http.patch<User>(this.url(`${userId}`), body);
	}

	changeCoverPhoto(userId: number, file: File) {
		const body = new FormData();
		body.append("cover", file);

		return this.http.patch<User>(this.url(`${userId}`), body);
	}

	follow(userId: number) {
		return this.http.patch<null>(this.url(`${userId}/follow`), {});
	}

	unfollow(userId: number) {
		return this.http.patch<null>(this.url(`${userId}/unfollow`), {});
	}

	validateCurrentUser() {
		return this.http.get<User>(`${environment.api}/auth/validate_current_user`);
	}

	private url(url: string) {
		return `${environment.api}/users/${url}`;
	}

	getUser(userId: number) {
		return this.http.get<User>(this.url(`${userId}`));
	}
}
