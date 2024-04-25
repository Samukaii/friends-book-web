import { Component, inject, input, OnInit, signal } from '@angular/core';
import { PostsService } from "./posts.service";
import { JsonPipe } from "@angular/common";
import { Post } from "./models/post";
import { PostsCardComponent } from "./card/posts-card.component";
import { PostsCreateComponent } from "./posts-create/posts-create.component";
import { PostsRepositoryService } from "./posts-repository.service";
import { SkeletonModule } from "primeng/skeleton";
import { PostsLoadingComponent } from "./posts-loading/posts-loading.component";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { PostsActionsService } from "./posts-actions.service";
import { MenuItem } from "primeng/api";

@Component({
	selector: 'app-posts',
	standalone: true,
	imports: [
		JsonPipe,
		PostsCardComponent,
		PostsCreateComponent,
		SkeletonModule,
		PostsLoadingComponent,
		PostsListComponent
	],
	templateUrl: './posts.component.html',
	styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
	repository = inject(PostsRepositoryService);
	actionsService = inject(PostsActionsService);

	ngOnInit() {
		this.repository.fetch();
	}

	actionsFn = (post: Post): MenuItem[] => [
		{
			label: "Excluir publicação",
			icon: "pi pi-trash",
			command: event => {
				this.actionsService.delete(post?.id);
			}
		}
	]
}
