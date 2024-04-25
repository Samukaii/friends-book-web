import { Component, input, Input } from '@angular/core';
import { User } from "../../../models/user";
import { AvatarComponent } from "../../avatar/avatar.component";
import { UserAvatarInfoDirective } from "../../../directives/user-avatar-info.directive";
import { UsersCardListLoadingComponent } from "./loading/users-card-list-loading.component";

@Component({
	selector: 'app-users-card-list',
	standalone: true,
	imports: [
		AvatarComponent,
		UserAvatarInfoDirective,
		UsersCardListLoadingComponent
	],
	templateUrl: './users-card-list.component.html',
	styleUrl: './users-card-list.component.scss'
})
export class UsersCardListComponent {
	cardTitle = input<string>();
	users = input<User[]>([]);
	loading = input(false);
}
