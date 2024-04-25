import { computed, Injectable } from '@angular/core';
import { getRouteData } from "./toolbar.service";
import { AppRouteConfiguration } from "../../shared/models/app-route-configuration";

@Injectable({
	providedIn: 'root'
})
export class RouteConfigurationService {
	private routeData = getRouteData();

	private defaultConfiguration: Required<AppRouteConfiguration> = {
		showToolbar: true,
		showMenu: true,
		showFriends: true
	};

	routeConfiguration = computed(
		() => {
			const config: AppRouteConfiguration = this.routeData()['routeConfiguration'] || {};

			return {
				...this.defaultConfiguration,
				...config
			} as Required<AppRouteConfiguration>;
		}
	);
}
