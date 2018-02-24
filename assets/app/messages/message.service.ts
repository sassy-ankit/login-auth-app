import { Message } from './message.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MessageService {
	private messages: Message[] = [];

	constructor(private http: HttpClient) {}

	addMessage(message: Message) {
		console.log(message);

		this.messages.push(message);
		const body = JSON.stringify(message);
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http
			.post('http://localhost:3000/message', body, { headers: headers })
			.catch((error: Response) => Observable.throw(error.json()));
	}

	getMessages() {
		return this.messages;
	}

	deleteMessage(message) {
		this.messages.splice(this.messages.indexOf(message), 1);
	}
}
