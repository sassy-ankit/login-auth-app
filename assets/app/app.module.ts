import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { MessageService } from './messages/message.service';
import { AuthService } from './auth/auth.service';

import { AppComponent } from './app.component';
import { MessageComponent } from './messages/message.component';
import { MessageInputComponent } from './messages/message-input.component';
import { MessageListComponent } from './messages/message-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';
import { LogoutComponent } from './auth/logout.component';
import { SignUpComponent } from './auth/signup.component';
import { SignInComponent } from './auth/signin.component';

const authRoutes: Routes = [
	{ path: '', redirectTo: 'signup', pathMatch: 'full' },
	{ path: 'signup', component: SignUpComponent },
	{ path: 'signin', component: SignInComponent },
	{ path: 'logout', component: LogoutComponent }
];

const appRoutes: Routes = [
	{ path: '', redirectTo: '/messages', pathMatch: 'full' },
	{ path: 'messages', component: MessagesComponent },
	{
		path: 'auth',
		component: AuthenticationComponent,
		children: authRoutes
	}
];

@NgModule({
	declarations: [
		AppComponent,
		MessageComponent,
		MessageInputComponent,
		MessageListComponent,
		MessagesComponent,
		AuthenticationComponent,
		HeaderComponent,
		LogoutComponent,
		SignUpComponent,
		SignInComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		RouterModule.forRoot(appRoutes),
		ReactiveFormsModule,
		HttpModule
	],
	exports: [RouterModule],
	providers: [MessageService, AuthService],
	bootstrap: [AppComponent]
})
export class AppModule {}
