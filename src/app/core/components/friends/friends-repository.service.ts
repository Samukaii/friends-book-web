import { inject, Injectable, signal } from '@angular/core';
import { UsersService } from "../../../pages/my-profile/users.service";
import { User } from "../../../shared/models/user";
import { BasicRepository } from "../../../shared/models/basic-repository";
import { CurrentUserService } from "../../services/current-user.service";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FriendsRepositoryService implements BasicRepository<User> {
	data = signal<User[]>([]);
	loading = signal(false);

	private service = inject(UsersService);
	private currentUserService = inject(CurrentUserService);

	async fetch() {
		this.loading.set(true);
		const users = await this.get();
		this.loading.set(false);

		this.data.set(users);
	}

	private get() {
		const currentUser = this.currentUserService.user()!;

		return firstValueFrom(this.service.getFollowing(currentUser.id));
	}
}
