import { Component, computed, inject, input } from '@angular/core';
import { Post } from "../models/post";
import { ImagePlaceholderConfig, NgOptimizedImage } from "@angular/common";
import { AvatarModule } from "primeng/avatar";
import { CardModule } from "primeng/card";
import { SkeletonModule } from "primeng/skeleton";
import { environment } from "../../../../environments/environment";
import { CallPipe } from "../../../shared/pipes/call.pipe";
import { dayjs } from "../../../shared/helpers/dayjs";
import { ImageModule } from "primeng/image";
import { MenuModule } from "primeng/menu";
import { ButtonModule } from "primeng/button";
import { ConfirmationService, MenuItem, MenuItemCommandEvent } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { PostsActionsService } from "../posts-actions.service";
import { CurrentUserService } from "../../../core/services/current-user.service";
import { AvatarComponent } from "../../../shared/components/avatar/avatar.component";
import { UserAvatarInfoDirective } from "../../../shared/directives/user-avatar-info.directive";

@Component({
	selector: 'app-posts-card',
	standalone: true,
	imports: [
		NgOptimizedImage,
		AvatarModule,
		CardModule,
		SkeletonModule,
		CallPipe,
		ImageModule,
		MenuModule,
		ButtonModule,
		ConfirmDialogModule,
		AvatarComponent,
		UserAvatarInfoDirective
	],
	templateUrl: './posts-card.component.html',
	styleUrl: './posts-card.component.scss',
})
export class PostsCardComponent {
	post = input.required<Post>();
	actions = input<MenuItem[]>([]);

	authentication = inject(PostsActionsService);
	currentUser = inject(CurrentUserService);

	isCurrentUser = computed(() => {
		return this.currentUser.isCurrentUser(this.post().createdBy.id);
	});

	canShowActions = computed(() => {
		const isCurrentUser = this.isCurrentUser();

		return !!this.actions().length && isCurrentUser;
	});

	userName = computed(() => {
		const {createdBy} = this.post();

		return `${createdBy.name} ${createdBy.surname}`;
	})

	getTime(post: Post) {
		const {createdAt} = post;

		return dayjs(createdAt).fromNow();
	}

	getImage(url?: string) {
		if (!url) return;

		return `${environment.api}/${url}`
	}
}
