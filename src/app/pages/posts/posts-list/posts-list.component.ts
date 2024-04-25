import { Component, input } from '@angular/core';
import { PostsCardComponent } from "../card/posts-card.component";
import { PostsLoadingComponent } from "../posts-loading/posts-loading.component";
import { Post } from "../models/post";
import { MenuItem } from "primeng/api";
import { CallPipe } from "../../../shared/pipes/call.pipe";


@Component({
	selector: 'app-posts-list',
	standalone: true,
	imports: [
		PostsCardComponent,
		PostsLoadingComponent,
		CallPipe
	],
	templateUrl: './posts-list.component.html',
	styleUrl: './posts-list.component.scss'
})
export class PostsListComponent {
	posts = input.required<Post[]>();
	loading = input(false);
	notFoundMessage = input("Parece que ninguém publicou nada ainda! Seja o primeiro!");
	actionsFn = input<(post: Post) => MenuItem[]>(() => []);
}
