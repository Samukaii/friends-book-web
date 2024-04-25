import { Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { environment } from "../../../../environments/environment";
import { AvatarModule } from "primeng/avatar";
import { CallPipe } from "../../pipes/call.pipe";

@Component({
  selector: 'app-avatar',
  standalone: true,
	imports: [
		NgOptimizedImage,
		AvatarModule,
		CallPipe
	],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
	imageUrl = input<string>();
	size = input<'normal' | 'large' | 'xlarge'>('large');
	shape = input<'square' | 'circle'>('circle');

	fullUrl = computed(() => {
		if(!this.imageUrl()) return;

		return `${environment.api}/${this.imageUrl()}`
	})
}
