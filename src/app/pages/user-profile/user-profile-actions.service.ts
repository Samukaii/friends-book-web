import { inject, Injectable, signal } from '@angular/core';
import { BasicRepository } from "../../shared/models/basic-repository";
import { Post } from "../posts/models/post";
import { PostsService } from "../posts/posts.service";
import { firstValueFrom } from "rxjs";
import { UserProfileRepository } from "./user-profile-repository.service";
import { CurrentUserService } from "../../core/services/current-user.service";
import { UsersService } from "../my-profile/users.service";


@Injectable({
  providedIn: 'root'
})
export class UserProfileActionsService {
	private repository = inject(UserProfileRepository);
	private currentUserService = inject(CurrentUserService);
	private usersService = inject(UsersService);

	async follow() {
		const user = this.repository.data().user;

		await firstValueFrom(this.usersService.follow(user.id));

		await this.repository.fetchUser(user.id);
	}

	async unfollow() {
		const user = this.repository.data().user;

		await firstValueFrom(this.usersService.unfollow(user.id));

		await this.repository.fetchUser(user.id);
	}
}
