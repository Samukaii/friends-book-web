import { Component, computed, inject, OnInit } from '@angular/core';
import { PostsComponent } from "../posts/posts.component";
import { PostsListComponent } from "../posts/posts-list/posts-list.component";
import { AvatarComponent } from "../../shared/components/avatar/avatar.component";
import { CurrentUserService } from "../../core/services/current-user.service";
import { MyProfileRepository } from "./my-profile-repository.service";
import { PostsCreatorComponent } from "../posts/creator/posts-creator.component";
import { PostPayload } from "../posts/models/post-payload";
import { PostsActionsService } from "../posts/posts-actions.service";
import { MenuModule } from "primeng/menu";
import { FileUploadDirective } from "../../shared/directives/file-upload.directive";
import { UsersService } from "./users.service";
import { JsonPipe } from "@angular/common";
import { ProfileComponent } from "../../shared/components/profile/profile.component";
import { BreakpointsService } from "../../core/services/breakpoints.service";

@Component({
  selector: 'app-my-profile',
  standalone: true,
	imports: [
		PostsComponent,
		PostsListComponent,
		AvatarComponent,
		PostsCreatorComponent,
		MenuModule,
		FileUploadDirective,
		JsonPipe,
		ProfileComponent
	],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent implements OnInit {
	repository = inject(MyProfileRepository);

	private currentUserService = inject(CurrentUserService);
	private actions = inject(PostsActionsService);
	private usersService = inject(UsersService);
	breakpoints = inject(BreakpointsService);

	currentUser = computed(() => this.currentUserService.user());

	ngOnInit() {
		this.repository.fetchAll();
	}

	create(payload: PostPayload) {
		this.actions.create(payload);
	}

	onProfileChange($event: File) {
		const userId = this.currentUser()!.id;

		this.usersService.changeProfilePhoto(userId, $event).subscribe(() => {
			this.currentUserService.refreshUser();
		})
	}

	onCoverChange($event: File) {
		const userId = this.currentUser()!.id;

		this.usersService.changeCoverPhoto(userId, $event).subscribe(() => {
			this.currentUserService.refreshUser();
		})
	}
}
