import { Injectable } from '@angular/core';
import { ButtonAutoLoading } from "../../shared/models/button-auto-loading";
import { HttpRequest, HttpResponse } from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})
export class ButtonAutoLoadingService {
	private lastClickedButton?: ButtonAutoLoading;
	private requestRegistered?: string;
	private manualLoading = false;

	setLastClickedButton(button: ButtonAutoLoading) {
		this.lastClickedButton = button;

		if(this.manualLoading) return;

		setTimeout(() => {
			if(this.manualLoading) return;

			if(!this.requestRegistered) this.clearLastButton();
		}, 500);
	}

	loadingManually(enabled: boolean) {
		this.manualLoading = true;

		if(enabled)
			this.lastClickedButton?.loading(enabled);
		else {
			this.manualLoading = false;
			this.clearLastButton();
		}
	}

	clearLastButton() {
		this.lastClickedButton?.loading(false);
		delete this.lastClickedButton;
		delete this.requestRegistered;
	}

	registerRequest(request: HttpRequest<any>) {
		if(this.manualLoading) return;

		if(!this.requestRegistered && this.lastClickedButton) {
			this.requestRegistered = request.url;
			this.lastClickedButton.loading(true);
		}
	}

	registerResponse(response: HttpResponse<any>) {
		if(this.manualLoading) return;

		if(response.url === this.requestRegistered) {
			this.clearLastButton();
		}
	}
}
