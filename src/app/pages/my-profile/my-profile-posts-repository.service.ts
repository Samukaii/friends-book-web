import { inject, Injectable, signal } from '@angular/core';
import { BasicRepository } from "../../shared/models/basic-repository";
import { Post } from "../posts/models/post";
import { PostsService } from "../posts/posts.service";
import { firstValueFrom } from "rxjs";
import { CurrentUserService } from "../../core/services/current-user.service";


@Injectable({
  providedIn: 'root'
})
export class MyProfilePostsRepositoryService implements BasicRepository<Post>{
	data = signal<Post[]>([]);
	loading = signal(false);

	private service = inject(PostsService);
	private currentUserService = inject(CurrentUserService);

	async fetch() {
		this.loading.set(true);
		const posts = await this.all();
		this.loading.set(false);

		this.data.set(posts);
	}

	private all() {
		const currentUser = this.currentUserService.user();

		return firstValueFrom(this.service.getPostsByUser(currentUser!.id));
	}
}
