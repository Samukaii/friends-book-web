import { Component, computed, inject, OnInit } from '@angular/core';
import { FriendsRepositoryService } from "./friends-repository.service";
import { AvatarComponent } from "../../../shared/components/avatar/avatar.component";
import { UserAvatarInfoDirective } from "../../../shared/directives/user-avatar-info.directive";
import { TooltipModule } from "primeng/tooltip";
import { CarouselModule } from "primeng/carousel";
import { SkeletonModule } from "primeng/skeleton";

@Component({
	selector: 'app-friends',
	standalone: true,
	imports: [
		AvatarComponent,
		UserAvatarInfoDirective,
		TooltipModule,
		CarouselModule,
		SkeletonModule
	],
	templateUrl: './friends.component.html',
	styleUrl: './friends.component.scss'
})
export class FriendsComponent implements OnInit {
	repository = inject(FriendsRepositoryService);

	ngOnInit() {
		this.repository.fetch();
	}

	visibleItems = computed(() => {
		const data = this.repository.data();

		if(data.length > 10) return 10;

		return data.length;
	});

	size = computed(() => this.visibleItems() * 69 + 96 + 'px');
}
