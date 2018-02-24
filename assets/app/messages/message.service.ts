import { Http, Response, Headers } from '@angular/http';
import { Injectable, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Message } from './message.model';

@Injectable()
export class MessageService implements OnInit {
	private messages: Message[] = [];

	constructor(private http: Http) {}

	ngOnInit() {
		this.getMessages();
	}

	addMessage(message: Message) {
		this.messages.push(message);
		const body = JSON.stringify(message);
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http
			.post('http://localhost:3000/message', body, { headers: headers })
			.map((response: Response) => response.json())
			.catch((error: Response) => Observable.throw(error.json()));
	}

	getMessages() {
		return this.http
			.get('http://localhost:3000/message')
			.map((response: Response) => {
				const messages = response.json().obj;
				let transformedMessages: Message[] = [];
				for (let message of messages) {
					transformedMessages.push(
						new Message(message.content, message.id, 'Dummy', null)
					);
				}
				this.messages = transformedMessages;
				return transformedMessages;
			})
			.catch((error: Response) => Observable.throw(error.json()));
	}

	deleteMessage(message) {
		this.messages.splice(this.messages.indexOf(message), 1);
	}
}
