import { Component, computed, inject } from '@angular/core';
import { AvatarComponent } from "../../../shared/components/avatar/avatar.component";
import { AvatarModule } from "primeng/avatar";
import { CardModule } from "primeng/card";
import { DividerModule } from "primeng/divider";
import { ButtonModule } from "primeng/button";
import { MatIcon } from "@angular/material/icon";
import { InputTextareaModule } from "primeng/inputtextarea";
import { JsonPipe, NgOptimizedImage } from "@angular/common";
import { AuthenticationService } from "../../../core/services/authentication.service";
import { environment } from "../../../../environments/environment";
import { CallPipe } from "../../../shared/pipes/call.pipe";
import { FileUploadDirective } from "../../../shared/directives/file-upload.directive";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { value } from "../../register/register.component";
import { PostsService } from "../posts.service";
import { PostsRepositoryService } from "../posts-repository.service";
import { PostsActionsService } from "../posts-actions.service";
import { CurrentUserService } from "../../../core/services/current-user.service";
import { PostsCreatorComponent } from "../creator/posts-creator.component";
import { PostPayload } from "../models/post-payload";

@Component({
	selector: 'app-posts-create',
	standalone: true,
	imports: [
		AvatarComponent,
		AvatarModule,
		CardModule,
		DividerModule,
		ButtonModule,
		MatIcon,
		InputTextareaModule,
		NgOptimizedImage,
		CallPipe,
		FileUploadDirective,
		ReactiveFormsModule,
		JsonPipe,
		PostsCreatorComponent
	],
	templateUrl: './posts-create.component.html',
	styleUrl: './posts-create.component.scss'
})
export class PostsCreateComponent {
	actions = inject(PostsActionsService);
	repository = inject(PostsRepositoryService);

	async create(payload: PostPayload) {
		await this.actions.create(payload);
		this.repository.fetch();
	}
}
