import { Component, computed, ElementRef, inject, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { isAtBrowser } from "./core/services/authentication.service";
import { ToastModule } from "primeng/toast";
import { ConfirmDialogModule } from "primeng/confirmdialog";
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

		return toolbar.getBoundingClientRect().height;
	});

	containerMaxHeight = computed(() => {
		const {showToolbar} = this.routeConfiguration();

		return showToolbar ? `calc(100vh - ${this.toolbarHeight()}px)` : '100vh';
	})
	loaded = false;
}
