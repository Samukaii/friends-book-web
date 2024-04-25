import { Component, Input } from '@angular/core';
import { User } from "../shared/models/user";
import { AutoCompleteCompleteEvent, AutoCompleteModule } from "primeng/autocomplete";
import { environment } from "../../environments/environment";
import { AvatarModule } from "primeng/avatar";
import { DecimalPipe } from "@angular/common";
import { CallPipe } from "../shared/pipes/call.pipe";

@Component({
	selector: 'app-friends-search',
	standalone: true,
	imports: [
		AvatarModule,
		AutoCompleteModule,
		DecimalPipe,
		CallPipe
	],
	templateUrl: './friends-search.component.html',
	styleUrl: './friends-search.component.scss'
})
export class FriendsSearchComponent {
	users: User[] = [
		{
			name: "Alef",
			surname: "Montesquiet",
			following: true,
			profile: {
				url: "",
				name: "",
				size: 60,
				type: ""
			},
			friends: 897,
			email: "",
			id: 78
		},
		{
			name: "Monique",
			surname: "Montenegro",
			following: true,
			profile: {
				url: "",
				name: "",
				size: 60,
				type: ""
			},
			friends: 5047,
			email: "",
			id: 78
		},
		{
			name: "Lucas",
			surname: "Santiago",
			following: true,
			profile: {
				url: "",
				name: "",
				size: 60,
				type: ""
			},
			friends: 9000,
			email: "",
			id: 78
		},
		{
			name: "Dominic",
			surname: "Andrew",
			following: true,
			profile: {
				url: "",
				name: "",
				size: 60,
				type: ""
			},
			friends: 401,
			email: "",
			id: 78
		},
	];

	getImage(url?: string) {
		if (!url) return;

		return `${environment.api}/${url}`
	}

	filterCountry($event: AutoCompleteCompleteEvent) {
		this.users = [...this.users];
	}
}
