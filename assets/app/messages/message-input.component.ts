import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';
import { Message } from './message.model';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-message-input',
	templateUrl: './message-input.component.html'
})
export class MessageInputComponent {
	constructor(private msgService: MessageService) {}

	OnInit() {}

	onSave(form: NgForm) {
		const message = new Message(form.value.content, 'Sassy-Ankit');
		this.msgService
			.addMessage(message)
			.subscribe(data => console.log(data), error => console.log(error));
		form.resetForm();
	}
}
