import { Component, OnInit } from "@angular/core";
import { User } from "../models/user";
import { Router } from "@angular/router";
import { UserService } from "../user.service";

@Component({
  selector: "app-see-user-profile",
  templateUrl: "./see-user-profile.component.html",
  styleUrls: ["./see-user-profile.component.css"],
})
export class SeeUserProfileComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("seeUserProfile"));
    this.loggedUser = JSON.parse(localStorage.getItem("user"));
  }

  user: User;
  loggedUser: User;

  a: boolean;
  poruka: string;

  backToBookPage() {
    localStorage.setItem("seeUserProfile", JSON.stringify(null));

    this.router.navigate(["user/"]);
  }

  follow() {
    if (this.loggedUser.following == null)
      this.loggedUser.following = new Array<string>();

    if (this.user.username == this.loggedUser.username) {
      this.poruka = "Ne mozete pratiti sam(u/og) sebe!";
      this.a = false;
      return;
    }

    for (let i = 0; i < this.loggedUser.following.length; i++) {
      if (this.loggedUser.following[i] == this.user.username) {
        this.poruka = "Korisnika " + this.user.username + " vec pratite!";
        this.a = false;
        return;
      }
    }

    this.loggedUser.following.push(this.user.username);

    localStorage.setItem("user", JSON.stringify(this.loggedUser));

    this.userService.updateFollowingList(this.loggedUser).subscribe((data) => {
      if (data) {
        this.poruka = "Uspesno pratite korisnika " + this.user.username;
        this.a = true;
      }
    });
  }
}
