import { Component, OnInit, SystemJsNgModuleLoaderConfig } from "@angular/core";
import { UserService } from "../user.service";
import { stringify } from "querystring";
import { User } from "../models/user";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-password-forget",
  templateUrl: "./password-forget.component.html",
  styleUrls: ["./password-forget.component.css"],
})
export class PasswordForgetComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  poruka: String;
  email: string;
  a: boolean;

  sendEmail() {
    let mailRegex = /^\w+@\w+\.\w+$/;

    if (this.emptyField(this.email)) {
      this.poruka = "Polje ne sme biti prazan!";
      this.a = false;
      return;
    }

    if (!mailRegex.test(this.email)) {
      this.poruka = "Koristite format email adrese user@example.com";
      this.a = false;
      return;
    }

    this.userService
      .sendMail(this.email)
      .subscribe((data: { user: User; poruka: string; flag: boolean }) => {
        this.a = data.flag;
        this.poruka = data.poruka;

        if (this.a) {
          localStorage.setItem("user", JSON.stringify(data.user));
          console.log(data.user.username);
          localStorage.setItem("forgetPassword", JSON.stringify(true));
        } else {
          localStorage.setItem("user", JSON.stringify(null));
        }
      });
  }

  emptyField(field): boolean {
    return field == "" || field == null;
  }
}
