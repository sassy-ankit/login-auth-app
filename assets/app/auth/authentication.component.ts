import { Component } from '@angular/core';

@Component({
	selector: 'app-authenatication',
	template: `
		<header class="row spacing">
			<nav class="col-md-8 col-md-offset-8">
				<ul class="nav nav-tabs">
					<li routerLinkActive="active"><a [routerLink]="['signup']">Sign Up</a></li>
					<li routerLinkActive="active"><a [routerLink]="['signin']">Sign In</a></li>
					<li routerLinkActive="active"><a [routerLink]="['logout']">Logout</a></li>
				</ul>
			</nav>
		</header>
		<header class="row spacing">
		<router-outlet></router-outlet>
		</header>
	`
})
export class AuthenticationComponent {
	constructor() {}
}
