import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { authInterceptor } from "./core/interceptors/auth.interceptor";
import { ConfirmationService, MessageService } from "primeng/api";
import { loggedInterceptor } from "./core/interceptors/logged.interceptor";

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
		provideClientHydration(),
		provideHttpClient(
			withFetch(),
			withInterceptors([
				authInterceptor,
				loggedInterceptor
			])
		),
		provideAnimationsAsync(),
		MessageService,
		ConfirmationService
	]
};
