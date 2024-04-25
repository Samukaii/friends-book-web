import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Post } from "../posts/models/post";
import { CurrentUserService } from "../../core/services/current-user.service";
import { User } from "../../shared/models/user";
import { MyProfileFollowersRepositoryService } from "./my-profile-followers-repository.service";
import { MyProfileFollowingRepositoryService } from "./my-profile-following-repository.service";
import { MyProfilePostsRepositoryService } from "./my-profile-posts-repository.service";

export interface RepositoryCollection<T> {
	data: Signal<T | null>;
	loading: Signal<boolean>;
	fetchAll: () => void;
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
export class MyProfileRepository implements RepositoryCollection<MyProfileData>{
	data = computed<MyProfileData>(() => {
		const user = this.currentUserService.user()!;
		const posts = this.posts.data();
		const followers = this.followers.data();
		const following = this.following.data();

		return { user, posts, followers, following}
	});
	loading = signal(false);

	private posts = inject(MyProfilePostsRepositoryService);
	private followers = inject(MyProfileFollowersRepositoryService);
	private following = inject(MyProfileFollowingRepositoryService);
	private currentUserService = inject(CurrentUserService);

	async fetchAll() {
		this.loading.set(true);
		await this.posts.fetch();
		await this.followers.fetch();
		await this.following.fetch();
		this.loading.set(false);
	}
}
