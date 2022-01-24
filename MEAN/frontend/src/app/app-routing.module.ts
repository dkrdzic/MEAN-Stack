import { NgModule, forwardRef } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { AppComponent } from "./app.component";
import { PasswordForgetComponent } from "./password-forget/password-forget.component";
import { PasswordResetComponent } from "./password-reset/password-reset.component";
import { GuestComponent } from "./guest/guest.component";
import { BookComponent } from "./book/book.component";
import { AdminComponent } from "./admin/admin.component";
import { UserComponent } from "./user/user.component";
import { BookUserComponent } from "./book-user/book-user.component";
import { SeeUserProfileComponent } from "./see-user-profile/see-user-profile.component";
import { AllHappeningsComponent } from "./all-happenings/all-happenings.component";
import { HappeningComponent } from "./happening/happening.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "passwordForget", component: PasswordForgetComponent },
  { path: "passwordReset", component: PasswordResetComponent },
  { path: "guest", component: GuestComponent },
  { path: "guest/book", component: BookComponent },
  { path: "book/:book", component: BookComponent },
  { path: "admin", component: AdminComponent },
  { path: "user", component: UserComponent },
  { path: "user/book", component: BookUserComponent },
  { path: "seeUserProfile", component: SeeUserProfileComponent },
  { path: "allHappenings", component: AllHappeningsComponent },
  { path: "happening", component: HappeningComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
