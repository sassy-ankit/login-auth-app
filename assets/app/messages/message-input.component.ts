import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from './message.service';
import { Message } from './message.model';

@Component({
	selector: 'app-message-input',
	templateUrl: './message-input.component.html'
})
export class MessageInputComponent implements OnInit {
	message: Message;
	constructor(private messageService: MessageService) {}

	ngOnInit() {
		this.messageService.messageIsEdit.subscribe((message: Message) => {
			this.message = message;
		});
	}

	onSave(form: NgForm) {
		if (this.message) {
			// If this.message is not null or underfined, then we are EDITING the message
			this.message.content = form.value.content;
			this.messageService.updateMessage(this.message).subscribe(
				result => {
					console.log(result);
				},
				error => {
					console.error(error);
				}
			);
			this.message = null;
		} else {
			// if this.message is null or undefined, then we are CREATING a new message
			const message = new Message(form.value.content, 'Sassy-Ankit');
			this.messageService.addMessage(message).subscribe(
				data => {
					console.log(data);
				},
				error => {
					console.error(error);
				}
			);
		}
		form.resetForm();
	}

	onClear(form: NgForm) {
		this.message = null;
		form.resetForm();
	}
}
