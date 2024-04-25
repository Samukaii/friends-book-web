import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Post } from "./models/post";
import { PostPayload } from "./models/post-payload";
import { PostsService } from "./posts.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { PostsRepositoryService } from "./posts-repository.service";
import { ConfirmDialog } from "primeng/confirmdialog";
import { firstValueFrom } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class PostsActionsService {
	posts = signal<Post[]>([]);

	private service = inject(PostsService);
	private repository = inject(PostsRepositoryService);
	private message = inject(MessageService);
	private confirm = inject(ConfirmationService);

	async create(payload: PostPayload) {
		await firstValueFrom(this.service.create(payload));

		this.message.add({severity: "success", summary: "Sua publicação foi criada com sucesso!"});
		this.repository.fetch();
	}

	delete(id: number) {
		this.confirm.confirm({
			message: 'Você tem certeza de que deseja excluir esta publicação?',
			header: 'Excluir publicação',
			icon: 'pi pi-exclamation-triangle',
			rejectButtonStyleClass: "p-button-text",
			acceptLabel: "Sim",
			rejectLabel: "Não",
			accept: () => {
				this.service.delete(id).subscribe(() => {
					this.message.add({severity: "success", summary: "Sua publicação foi excluída com sucesso!"});
					this.repository.fetch();
				});
			},
			reject: () => {
				this.confirm.close();
			}
		})

	}
}
