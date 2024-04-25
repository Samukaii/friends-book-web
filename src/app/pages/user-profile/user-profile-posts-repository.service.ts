import { inject, Injectable, signal } from '@angular/core';
import { BasicRepository } from "../../shared/models/basic-repository";
import { Post } from "../posts/models/post";
import { PostsService } from "../posts/posts.service";
import { firstValueFrom } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserProfilePostsRepositoryService implements BasicRepository<Post>{
	data = signal<Post[]>([]);
	loading = signal(false);

	private service = inject(PostsService);

	async fetch(userId: number) {
		this.loading.set(true);
		const data = await this.all(userId);
		this.loading.set(false);

		this.data.set(data);
	}

	private all(userId: number) {
		return firstValueFrom(this.service.getPostsByUser(userId));
	}
}
