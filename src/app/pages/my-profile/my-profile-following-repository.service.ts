import { inject, Injectable, signal } from '@angular/core';
import { BasicRepository } from "../../shared/models/basic-repository";
import { Post } from "../posts/models/post";
import { PostsService } from "../posts/posts.service";
import { firstValueFrom } from "rxjs";
import { CurrentUserService } from "../../core/services/current-user.service";
import { UsersService } from "./users.service";
import { User } from "../../shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class MyProfileFollowingRepositoryService implements BasicRepository<User>{
	data = signal<User[]>([]);
	loading = signal(false);

	private service = inject(UsersService);
	private currentUserService = inject(CurrentUserService);

	async fetch() {
		this.loading.set(true);
		const data = await this.all();
		this.loading.set(false);

		this.data.set(data);
	}

	private all() {
		const currentUser = this.currentUserService.user();

		return firstValueFrom(this.service.getFollowing(currentUser!.id));
	}
}
