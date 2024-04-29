import { Directive, HostBinding, HostListener, inject, input } from '@angular/core';
import { Router } from "@angular/router";
import { CurrentUserService } from "../../core/services/current-user.service";

@Directive({
	selector: '[appUserAvatarInfo]',
	standalone: true
})
export class UserAvatarInfoDirective {
	router = inject(Router);
	currentUserService = inject(CurrentUserService);
	userId = input.required<number>()

	@HostBinding("style.cursor")
	cursor = "pointer";

	@HostListener("click")
	onClick() {
		if(this.currentUserService.isCurrentUser(this.userId()))
			this.router.navigate(["my-profile"]);
		else this.router.navigate(["profile", this.userId()]);
	}
}
