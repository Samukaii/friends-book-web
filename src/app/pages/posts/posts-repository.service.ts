import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Post } from "./models/post";
import { PostPayload } from "./models/post-payload";
import { PostsService } from "./posts.service";
import { firstValueFrom } from "rxjs";
import { BasicRepository } from "../../shared/models/basic-repository";

@Injectable({
	providedIn: 'root'
})
export class PostsRepositoryService implements BasicRepository<Post> {
	data = signal<Post[]>([]);
	loading = signal(false);

	private service = inject(PostsService);

	async fetch() {
		this.loading.set(true);
		const posts = await this.all();
		this.loading.set(false);

		this.data.set(posts);
	}

	private all() {
		return firstValueFrom(this.service.getPosts());
	}
}
