import { Component, computed, input } from '@angular/core';
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: 'app-search-friends-list-loading',
  standalone: true,
	imports: [
		SkeletonModule
	],
  templateUrl: './search-friends-list-loading.component.html',
  styleUrl: './search-friends-list-loading.component.scss'
})
export class SearchFriendsListLoadingComponent {
	sample = input(6);

	items = computed(() => new Array(this.sample()).map((_, i) => i));
}
