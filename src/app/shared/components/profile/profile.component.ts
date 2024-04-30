import { Component, computed, inject, input, output } from '@angular/core';
import { AvatarComponent } from "../avatar/avatar.component";
import { FileUploadDirective } from "../../directives/file-upload.directive";
import { PostsCreatorComponent } from "../../../pages/posts/creator/posts-creator.component";
import { PostsListComponent } from "../../../pages/posts/posts-list/posts-list.component";
import { TooltipModule } from "primeng/tooltip";
import { MyProfileData, MyProfileRepository } from "../../../pages/my-profile/my-profile-repository.service";
import { PostPayload } from "../../../pages/posts/models/post-payload";
import { environment } from '../../../../environments/environment';
import { ButtonModule } from "primeng/button";
import { UserAvatarInfoDirective } from "../../directives/user-avatar-info.directive";
import { ProfileLoadingComponent } from "./loading/profile-loading.component";
import { UsersCardListComponent } from "./users-card-list/users-card-list.component";
import { UserInfoComponent } from "./info/user-info.component";

@Component({
  selector: 'app-profile',
  standalone: true,
	imports: [
		AvatarComponent,
		FileUploadDirective,
		PostsCreatorComponent,
		PostsListComponent,
		TooltipModule,
		ButtonModule,
		UserAvatarInfoDirective,
		ProfileLoadingComponent,
		UsersCardListComponent,
		UserInfoComponent
	],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
	repository = inject(MyProfileRepository);
	readonly = input(false);
	loading = input(false);
	notFoundMessage = input("");
	showFollowers = input(false);

	info = input.required<MyProfileData>();

	coverChange = output<File>();
	profileChange = output<File>();
	createPost = output<PostPayload>();

	follow = output();
	unfollow = output();

	environment = environment.api;

	user = computed(() => this.info().user);

	userCover = computed(() => {
		const user = this.user();

		if(!user?.cover) return;

		return `${environment.api}/${user.cover.url}`;
	});

	fullUserName = computed(() => {
		const user = this.user();

		if(!user) return;

		return `${user.name} ${user.surname}`;
	});

	create(payload: PostPayload) {
		this.createPost.emit(payload);
	}

	onProfileChange($event: File[]) {
		if(this.readonly()) return;
		this.profileChange.emit($event[0]);
	}

	onCoverChange($event: File[]) {
		if(this.readonly()) return;
		this.coverChange.emit($event[0]);
	}
}
