import { Component, inject, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProfileComponent } from "../../shared/components/profile/profile.component";
import { UserProfileRepository } from "./user-profile-repository.service";
import { UserProfileActionsService } from "./user-profile-actions.service";
import { BreakpointsService } from "../../core/services/breakpoints.service";

@Component({
  selector: 'app-user-profile',
  standalone: true,
	imports: [
		ProfileComponent
	],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnChanges {
	id = input<number>();
	repository = inject(UserProfileRepository);
	actions = inject(UserProfileActionsService);
	breakpoints = inject(BreakpointsService);

	ngOnChanges(changes: SimpleChanges) {
		if(changes["id"])
			this.repository.fetchAll(this.id()!);
	}

	unfollow() {
		this.actions.unfollow();
	}

	follow() {
		this.actions.follow();
	}
}
