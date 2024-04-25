import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Post } from "../posts/models/post";
import { CurrentUserService } from "../../core/services/current-user.service";
import { User } from "../../shared/models/user";
import { UserProfileFollowersRepositoryService } from "./user-profile-followers-repository.service";
import { UserProfileFollowingRepositoryService } from "./user-profile-following-repository.service";
import { UserProfilePostsRepositoryService } from "./user-profile-posts-repository.service";
import { UsersService } from "../my-profile/users.service";
import { firstValueFrom } from "rxjs";

export interface RepositoryCollection<T> {
	data: Signal<T | null>;
	loading: Signal<boolean>;
	fetchAll: (...args: any[]) => void;
}

export interface MyProfileData {
	user: User;
	posts: Post[];
	followers: User[];
	following: User[];
}


@Injectable({
  providedIn: 'root'
})
export class UserProfileRepository implements RepositoryCollection<MyProfileData>{
	data = computed<MyProfileData>(() => {
		const user = this.user()!;
		const posts = this.posts.data();
		const followers = this.followers.data();
		const following = this.following.data();

		return { user, posts, followers, following}
	});
	loading = signal(false);

	private posts = inject(UserProfilePostsRepositoryService);
	private followers = inject(UserProfileFollowersRepositoryService);
	private following = inject(UserProfileFollowingRepositoryService);
	private userService = inject(UsersService);
	private user = signal<User | null>(null);

	async fetchAll(userId: number, enableLoading = true) {
		this.loading.set(enableLoading);
		await this.fetchUser(userId);
		await this.posts.fetch(userId);
		await this.followers.fetch(userId);
		await this.following.fetch(userId);
		this.loading.set(false);
	}

	async fetchUser(userId: number) {
		const user = await firstValueFrom(this.userService.getUser(userId));

		this.user.set(user);
	}
}
