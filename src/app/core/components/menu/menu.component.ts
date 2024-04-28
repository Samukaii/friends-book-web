import { Component, computed, inject } from '@angular/core';
import { MenuItem, PrimeIcons } from "primeng/api";
import { AuthenticationService } from "../../services/authentication.service";
import { MenuModule } from "primeng/menu";
import { AvatarComponent } from "../../../shared/components/avatar/avatar.component";
import { CurrentUserService } from "../../services/current-user.service";

@Component({
	selector: 'app-menu',
	standalone: true,
	imports: [
		MenuModule,
		AvatarComponent
	],
	templateUrl: './menu.component.html',
	styleUrl: './menu.component.scss'
})
export class MenuComponent {
	authentication = inject(AuthenticationService);
	userService = inject(CurrentUserService);

	navigation: MenuItem[] = [
		{
			label: "Página inicial",
			icon: PrimeIcons.HOME,
			routerLink: "posts"
		},
		{
			label: "Meu perfil",
			icon: PrimeIcons.USER,
			routerLink: "my-profile"
		},
		{
			label: "Encontrar amigos",
			icon: PrimeIcons.SEARCH,
			routerLink: "search-friends"
		},
		{
			label: "Sair",
			icon: PrimeIcons.SIGN_OUT,
			iconStyle: {color: "red"},
			styleClass: "sign-out-menu",
			command: () => this.authentication.logout()
		},
	];

	currentUser = computed(() => this.userService.user());
	fullName = computed(() => {
		const user = this.currentUser();
		if(!user) return;

		return `${user.name} ${user.surname}`
	});
}
