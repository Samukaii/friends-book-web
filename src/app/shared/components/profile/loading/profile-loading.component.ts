import { Component } from '@angular/core';
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: 'app-profile-loading',
  standalone: true,
	imports: [
		SkeletonModule
	],
  templateUrl: './profile-loading.component.html',
  styleUrl: './profile-loading.component.scss'
})
export class ProfileLoadingComponent {

}
