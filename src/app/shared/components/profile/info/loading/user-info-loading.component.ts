import { Component } from '@angular/core';
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: 'app-user-info-loading',
  standalone: true,
	imports: [
		SkeletonModule
	],
  templateUrl: './user-info-loading.component.html',
  styleUrl: './user-info-loading.component.scss'
})
export class UserInfoLoadingComponent {

}
