import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

import {HttpClientModule} from '@angular/common/http'

import {FormsModule} from '@angular/forms'
import { UserService } from './user.service';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordForgetComponent } from './password-forget/password-forget.component';




import { GuestComponent } from './guest/guest.component';
import { BookService } from './book.service';
import { BookComponent } from './book/book.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { BookUserComponent } from './book-user/book-user.component';
import { SeeUserProfileComponent } from './see-user-profile/see-user-profile.component';
import { AllHappeningsComponent } from './all-happenings/all-happenings.component';
import { HappeningComponent } from './happening/happening.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    PasswordResetComponent,
    PasswordForgetComponent,
    GuestComponent,
    BookComponent,
    AdminComponent,
    UserComponent,
    BookUserComponent,
    SeeUserProfileComponent,
    AllHappeningsComponent,
    HappeningComponent,
 
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
 
    
  ],
  providers: [UserService,BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
