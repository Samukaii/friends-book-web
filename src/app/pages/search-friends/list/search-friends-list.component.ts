import { Component, input, output } from '@angular/core';
import { AvatarComponent } from "../../../shared/components/avatar/avatar.component";
import { ButtonModule } from "primeng/button";
import { User } from "../../../shared/models/user";
import { SearchFriendsListLoadingComponent } from "./loading/search-friends-list-loading.component";
import { ButtonAutoLoadingDirective } from "../../../shared/directives/button-auto-loading.directive";

@Component({
  selector: 'app-search-friends-list',
  standalone: true,
	imports: [
		AvatarComponent,
		ButtonModule,
		SearchFriendsListLoadingComponent,
		ButtonAutoLoadingDirective
	],
  templateUrl: './search-friends-list.component.html',
  styleUrl: './search-friends-list.component.scss'
})
export class SearchFriendsListComponent {
	users = input.required<User[]>();
	loading = input(false);
	follow = output<User>();
	unFollow = output<User>();
}
