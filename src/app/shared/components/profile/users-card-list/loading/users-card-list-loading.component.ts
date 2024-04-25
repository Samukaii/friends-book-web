import { Component } from '@angular/core';
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: 'app-users-card-list-loading',
  standalone: true,
	imports: [
		SkeletonModule
	],
  templateUrl: './users-card-list-loading.component.html',
  styleUrl: './users-card-list-loading.component.scss'
})
export class UsersCardListLoadingComponent {
	fakeCards = new Array(8).map((value, index) => index);
}
