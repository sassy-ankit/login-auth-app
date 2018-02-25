import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
	selector: 'app-authenatication',
	template: `
		<header class="row spacing">
			<nav class="col-md-8 col-md-offset-8">
				<ul class="nav nav-tabs">
					<li routerLinkActive="active"><a [routerLink]="['signup']">Sign Up</a></li>
					<li routerLinkActive="active" *ngIf="!isLoggedIn()"><a [routerLink]="['signin']">Sign In</a></li>
					<li routerLinkActive="active" *ngIf="isLoggedIn()"><a [routerLink]="['logout']">Logout</a></li>
				</ul>
			</nav>
		</header>
		<header class="row spacing">
		<router-outlet></router-outlet>
		</header>
	`
})
export class AuthenticationComponent {
	constructor(private authSservice: AuthService) {}

	isLoggedIn() {
		return this.authSservice.isLoggedIn();
	}
}
