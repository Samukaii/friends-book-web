import { inject, Injectable, signal } from '@angular/core';
import { BasicRepository } from "../../shared/models/basic-repository";
import { firstValueFrom } from "rxjs";
import { User } from "../../shared/models/user";
import { UsersService } from "../my-profile/users.service";

@Injectable({
  providedIn: 'root'
})
export class UserProfileFollowersRepositoryService implements BasicRepository<User>{
	data = signal<User[]>([]);
	loading = signal(false);

	private service = inject(UsersService);

	async fetch(userId: number) {
		this.loading.set(true);
		const data = await this.all(userId);
		this.loading.set(false);

		this.data.set(data);
	}

	private all(userId: number) {
		return firstValueFrom(this.service.getFollowers(userId));
	}
}
