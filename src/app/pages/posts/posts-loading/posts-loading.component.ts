import { Component, computed, input } from '@angular/core';
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: 'app-posts-loading',
  standalone: true,
	imports: [
		SkeletonModule
	],
  templateUrl: './posts-loading.component.html',
  styleUrl: './posts-loading.component.scss'
})
export class PostsLoadingComponent {
	count = input(3);
	items = computed(() => new Array(this.count()));
}
