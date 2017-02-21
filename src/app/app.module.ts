import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { SignupComponent } from './signup.component';
import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard.component';
import { ComposeComponent } from './compose.component';
import { ConversationComponent } from './conversation.component';

import { UserService } from './user.service';
import { ConversationService } from './conversation.service';
import { HelperService } from './helper.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    ComposeComponent,
    ConversationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'compose',
        component: ComposeComponent
      },
      {
        path: 'conversation/:id',
        component: ConversationComponent
      }
    ])
  ],
  providers: [ UserService, ConversationService, HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
