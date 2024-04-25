import { Component, computed, effect, ElementRef, inject, viewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { MatTooltip } from "@angular/material/tooltip";
import { AuthenticationService, isAtBrowser } from "./core/services/authentication.service";
import { ToolbarModule } from "primeng/toolbar";
import { ToolbarService } from "./core/services/toolbar.service";
import { ToastModule } from "primeng/toast";
import { ConfirmationService, MenuItem, MessageService, PrimeIcons } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { AutoCompleteCompleteEvent, AutoCompleteModule } from "primeng/autocomplete";
import { ReactiveFormsModule } from "@angular/forms";
import { User } from "./shared/models/user";
import { AvatarModule } from "primeng/avatar";
import { CallPipe } from "./shared/pipes/call.pipe";
import { environment } from "../environments/environment";
import { FriendsSearchComponent } from "./friends-search/friends-search.component";
import { AvatarComponent } from "./shared/components/avatar/avatar.component";
import { CurrentUserService } from "./core/services/current-user.service";
import { MenuModule } from "primeng/menu";
import { RouteConfigurationService } from "./core/services/route-configuration.service";
import { FriendsComponent } from "./core/components/friends/friends.component";
import { MenuComponent } from "./core/components/menu/menu.component";

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, ConfirmDialogModule, ToastModule, RouterOutlet, FriendsComponent, MenuComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	isAtBrowser = isAtBrowser();
	routeConfiguration = inject(RouteConfigurationService).routeConfiguration;

	friendsElement = viewChild("friends", {read: ElementRef<HTMLElement>});
	toolbarHeight = computed(() => {
		const toolbar = this.friendsElement()?.nativeElement;
		if (!toolbar || !this.isAtBrowser) return 0;

		console.log(toolbar.getBoundingClientRect());

		return toolbar.getBoundingClientRect().height;
	});

	containerMaxHeight = computed(() => {
		const {showToolbar} = this.routeConfiguration();

		return showToolbar ? `calc(100vh - ${this.toolbarHeight()}px)` : '100vh';
	})
	loaded = false;
}
