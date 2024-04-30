import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { MenuItem, PrimeIcons } from "primeng/api";
import { AuthenticationService } from "../../services/authentication.service";
import { MenuModule } from "primeng/menu";
import { AvatarComponent } from "../../../shared/components/avatar/avatar.component";
import { CurrentUserService } from "../../services/current-user.service";
import { BreakpointsService } from "../../services/breakpoints.service";
import { UserAvatarInfoDirective } from "../../../shared/directives/user-avatar-info.directive";

@Component({
	selector: 'app-menu',
	standalone: true,
	imports: [
		MenuModule,
		AvatarComponent,
		UserAvatarInfoDirective
	],
	templateUrl: './menu.component.html',
	styleUrl: './menu.component.scss'
})
export class MenuComponent {
	authentication = inject(AuthenticationService);
	userService = inject(CurrentUserService);
	breakpoints = inject(BreakpointsService);

	private navigationItems: MenuItem[] = [
		{
			label: "Página inicial",
			tooltip: "Página inicial",
			icon: PrimeIcons.HOME,
			routerLink: "posts"
		},
		{
			label: "Meu perfil",
			tooltip: "Meu perfil",
			icon: PrimeIcons.USER,
			routerLink: "my-profile"
		},
		{
			label: "Encontrar amigos",
			tooltip: "Encontrar amigos",
			icon: PrimeIcons.SEARCH,
			routerLink: "search-friends"
		},
		{
			label: "Sair",
			tooltip: "Sair",
			icon: PrimeIcons.SIGN_OUT,
			iconStyle: {color: "red"},
			styleClass: "sign-out-menu",
			command: () => this.authentication.logout()
		},
	];

	currentUser = computed(() => this.userService.user());
	fullName = computed(() => {
		const user = this.currentUser();
		if (!user) return;

		return `${user.name} ${user.surname}`
	});

	navigation = computed(() => {
		const isSmall = this.breakpoints.isSmallScreen();

		return this.navigationItems.map(item => {
			if (isSmall) return {
				...item,
				label: undefined
			};

			return item;
		});
	});
}
