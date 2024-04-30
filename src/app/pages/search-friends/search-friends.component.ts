import { ChangeDetectorRef, Component, effect, inject, signal } from '@angular/core';
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { UsersService } from "../my-profile/users.service";
import { debounceTime } from "rxjs";
import { Debounce } from "../../shared/decorators/debounce";
import { User } from "../../shared/models/user";
import { AvatarComponent } from "../../shared/components/avatar/avatar.component";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { SearchFriendsListComponent } from "./list/search-friends-list.component";
import { ButtonAutoLoadingService } from "../../core/services/button-auto-loading.service";
import { FriendsRepositoryService } from "../../core/components/friends/friends-repository.service";

@Component({
  selector: 'app-search-friends',
  standalone: true,
	imports: [
		InputTextModule,
		FormsModule,
		AvatarComponent,
		ButtonModule,
		RippleModule,
		SearchFriendsListComponent
	],
  templateUrl: './search-friends.component.html',
  styleUrl: './search-friends.component.scss'
})
export class SearchFriendsComponent {
	protected search = signal('');
	protected loading = signal(false);
	protected users = signal<User[]>([]);

	private usersService = inject(UsersService);
	private friendsRepository = inject(FriendsRepositoryService);
	private detector = inject(ChangeDetectorRef);
	private loadingService = inject(ButtonAutoLoadingService);

	private searchOnType = effect(() => {
		this.loading.set(true);
		this.getUsers(this.search());
	}, {allowSignalWrites: true});

	@Debounce(500)
	private getUsers(search: string) {
		this.usersService.searchFriends(search)
			.subscribe(users => {
				this.users.set(users);
				this.loading.set(false);
				this.detector.markForCheck();
				this.loadingService.loadingManually(false);
			});
	}

	unFollow($event: User) {
		this.loadingService.loadingManually(true);

		this.usersService.unfollow($event.id).subscribe(() => {
			this.getUsers(this.search());
			this.friendsRepository.fetch();
		});
	}

	follow($event: User) {
		this.loadingService.loadingManually(true);

		this.usersService.follow($event.id).subscribe(() => {
			this.getUsers(this.search());
			this.friendsRepository.fetch();
		});
	}
}
