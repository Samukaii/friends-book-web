import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Post } from "./models/post";
import { PostPayload } from "./models/post-payload";
import { CurrentUserService } from "../../core/services/current-user.service";

@Injectable({
	providedIn: 'root'
})
export class PostsService {
	private http = inject(HttpClient);

	getPosts() {
		return this.http.get<Post[]>(`${environment.api}/posts`);
	}

	getPostsByUser(userId: number) {
		return this.http.get<Post[]>(`${environment.api}/posts/by_user/${userId}`);
	}

	create(payload: PostPayload) {
		const body = new FormData();
		body.append("title", payload.title);
		body.append("image", payload.image);

		return this.http.post<Post>(`${environment.api}/posts`, body);
	}

	delete(id: number) {
		return this.http.delete(`${environment.api}/posts/${id}`);
	}
}
