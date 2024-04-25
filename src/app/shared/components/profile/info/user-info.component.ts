import { Component, computed, input, output } from '@angular/core';
import { User } from "../../../models/user";
import { environment } from "../../../../../environments/environment";
import { FileUploadDirective } from "../../../directives/file-upload.directive";
import { TooltipModule } from "primeng/tooltip";
import { AvatarComponent } from "../../avatar/avatar.component";
import { ButtonModule } from "primeng/button";
import { UserInfoLoadingComponent } from "./loading/user-info-loading.component";

@Component({
	selector: 'app-user-info',
	standalone: true,
	imports: [
		FileUploadDirective,
		TooltipModule,
		AvatarComponent,
		ButtonModule,
		UserInfoLoadingComponent
	],
	templateUrl: './user-info.component.html',
	styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {
	user = input.required<User>()
	readonly = input(false);
	loading = input(false);

	profileChange = output<File>();
	coverChange = output<File>();
	unfollow = output<void>();
	follow = output<void>();

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
}
