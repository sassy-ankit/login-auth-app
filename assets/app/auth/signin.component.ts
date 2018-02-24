import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html'
})
export class SignInComponent {
	constructor() {}
	myForm: FormGroup;

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
		this.myForm.reset();
	}
}
