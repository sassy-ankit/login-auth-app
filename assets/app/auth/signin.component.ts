import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from './user.model';
import { AuthService } from './auth.service';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html'
})
export class SignInComponent {
	myForm: FormGroup;

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit() {
		this.myForm = new FormGroup({
			email: new FormControl(null, [
				Validators.required,
				Validators.pattern(
					/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
				)
			]),
			password: new FormControl(null, Validators.required)
		});
	}

	onSubmit() {
		console.log(this.myForm.value);
		const user = new User(this.myForm.value.email, this.myForm.value.password);
		this.authService.signin(user).subscribe(
			data => {
				localStorage.setItem('token', data.token);
				localStorage.setItem('userId', data.userId);
				this.router.navigateByUrl('/');
			},
			err => console.error(err)
		);
		this.myForm.reset();
	}
}
