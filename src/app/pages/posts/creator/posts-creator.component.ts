import { Component, computed, inject, output } from '@angular/core';
import { AvatarComponent } from "../../../shared/components/avatar/avatar.component";
import { ButtonModule } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { FileUploadDirective } from "../../../shared/directives/file-upload.directive";
import { InputTextareaModule } from "primeng/inputtextarea";
import { MatIcon } from "@angular/material/icon";
import { PaginatorModule } from "primeng/paginator";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CurrentUserService } from "../../../core/services/current-user.service";
import { PostsActionsService } from "../posts-actions.service";
import { value } from "../../register/register.component";
import { PostPayload } from "../models/post-payload";

@Component({
	selector: 'app-posts-creator',
	standalone: true,
	imports: [
		AvatarComponent,
		ButtonModule,
		DividerModule,
		FileUploadDirective,
		InputTextareaModule,
		MatIcon,
		PaginatorModule,
		ReactiveFormsModule
	],
	templateUrl: './posts-creator.component.html',
	styleUrl: './posts-creator.component.scss'
})
export class PostsCreatorComponent {
	create = output<PostPayload>();
	imageUrl?: string;
	currentUser = inject(CurrentUserService);

	form = inject(FormBuilder).nonNullable.group({
		title: [value<string>(), Validators.required],
		image: [value<File>(), Validators.required],
	});

	userProfile = computed(() => {
		return this.currentUser.user()?.profile?.url;
	})

	userName = computed(() => {
		return this.currentUser.user()?.name;
	})

	onFileUpload(files: File[]) {
		this.form.controls.image.setValue(files[0]);
		this.imageUrl = URL.createObjectURL(files[0]);
	}

	clearAll() {
		this.form.reset();
		delete this.imageUrl;
	}

	async onSubmit() {
		this.create.emit(this.form.getRawValue());
		this.clearAll();
	}
}
