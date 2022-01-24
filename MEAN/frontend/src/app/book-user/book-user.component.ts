import { Component, OnInit } from "@angular/core";
import { Book } from "../models/book";
import { User } from "../models/user";
import { BookService } from "../book.service";
import { Page } from "../models/page";
import { Comment } from "../models/comment";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { NumberValueAccessor } from "@angular/forms";

import { Rating } from "../models/rating";

@Component({
  selector: "app-book-user",
  templateUrl: "./book-user.component.html",
  styleUrls: ["./book-user.component.css"],
})
export class BookUserComponent implements OnInit {
  constructor(
    private bookService: BookService,
    private userService: UserService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.book = JSON.parse(localStorage.getItem("book"));
    this.user = JSON.parse(localStorage.getItem("user"));

    this.currentPage.page = 0;

    await this.getComments();
    await this.getUsers();
    await this.getRatings();
    console.log(this.book.coverImage);
  }

  poruka: string;
  a: boolean;
  book: Book;
  toRead: Book;
  user: User;
  button1: boolean;
  pagesBool: boolean;
  pages: number;
  currentPage: Page = new Page();

  allComments: Array<Comment>;

  commentBool: boolean;
  newComment: Comment;

  changeCommentBool: boolean;
  updateComment: string;
  commentToChange: Comment;
  users: Array<User>;

  async toReadList() {
    this.poruka = "";
    this.commentBool = false;
    this.pagesBool = false;

    if (this.user.booksToRead == null)
      this.user.booksToRead = new Array<number>();

    if (this.user.booksReading == null)
      this.user.booksReading = new Array<number>();

    if (this.user.booksFinished == null)
      this.user.booksFinished = new Array<number>();

    for (let i = 0; i < this.user.booksReading.length; i++) {
      if (this.user.booksReading[i] == this.book.id) {
        this.user.booksReading.splice(i, 1);
      }
    }

    for (let i = 0; i < this.user.booksFinished.length; i++) {
      if (this.user.booksFinished[i] == this.book.id) {
        this.user.booksFinished.splice(i, 1);
      }
    }

    for (let i = 0; i < this.user.booksToRead.length; i++) {
      if (this.user.booksToRead[i] == this.book.id) {
        this.a = false;
        this.poruka = "Knjiga je vec uneta u listu citanja";
        return;
      }
    }

    this.user.booksToRead.push(this.book.id);

    await new Promise((resolve, reject) => {
      this.bookService
        .updateBooksLists(this.user)
        .subscribe((data: boolean) => {
          if (data) resolve();
          else reject();
        });
    });

    this.a = true;
    this.poruka = "Uspesno ste uneli knjigu u listu citanja";
    localStorage.setItem("user", JSON.stringify(this.user));
  }

  async removeFromToReadList() {
    this.poruka = "";
    this.commentBool = false;
    this.pagesBool = false;

    for (let i = 0; i < this.user.booksToRead.length; i++) {
      if (this.user.booksToRead[i] == this.book.id) {
        this.a = true;
        this.user.booksToRead.splice(i, 1);

        await new Promise((resolve, reject) => {
          this.bookService
            .updateBooksLists(this.user)
            .subscribe((data: boolean) => {
              if (data) resolve();
              else reject();
            });
        });

        this.poruka = "Knjiga je uspesno izbrisana iz liste citanja";
        localStorage.setItem("user", JSON.stringify(this.user));
        return;
      }
    }

    this.a = false;
    this.poruka = "Knjiga koju zelite da izbrisete nije u listi citanja";
  }

  async readingList() {
    this.poruka = "";
    this.commentBool = false;
    this.pagesBool = false;
    if (this.user.booksReading == null)
      this.user.booksReading = new Array<number>();

    for (let i = 0; i < this.user.booksFinished.length; i++) {
      if (this.user.booksFinished[i] == this.book.id) {
        this.user.booksFinished.splice(i, 1);
      }
    }

    for (let i = 0; i < this.user.booksToRead.length; i++) {
      if (this.user.booksToRead[i] == this.book.id) {
        this.user.booksToRead.splice(i, 1);
      }
    }

    for (let i = 0; i < this.user.booksReading.length; i++) {
      if (this.user.booksReading[i] == this.book.id) {
        this.a = false;
        this.poruka = "Knjiga je vec u toku citanja";
        return;
      }
    }

    this.user.booksReading.push(this.book.id);

    await new Promise((resolve, reject) => {
      this.bookService
        .updateBooksLists(this.user)
        .subscribe((data: boolean) => {
          if (data) resolve();
          else reject();
        });
    });

    localStorage.setItem("user", JSON.stringify(this.user));

    this.a = true;
    this.poruka = "Trenutno citate knjigu '" + this.book.name + "'";
  }

  async bookFinished() {
    this.poruka = "";
    this.commentBool = false;
    this.pagesBool = false;

    if (this.user.booksFinished == null)
      this.user.booksFinished = new Array<number>();

    for (let i = 0; i < this.user.booksReading.length; i++) {
      if (this.user.booksReading[i] == this.book.id) {
        console.log(this.user.booksReading[i]);
        this.user.booksReading.splice(i, 1);
      }
    }

    for (let i = 0; i < this.user.booksToRead.length; i++) {
      if (this.user.booksToRead[i] == this.book.id) {
        this.user.booksToRead.splice(i, 1);
      }
    }

    for (let i = 0; i < this.user.booksFinished.length; i++) {
      if (this.user.booksFinished[i] == this.book.id) {
        this.a = false;
        this.poruka = "Knjiga je vec procitana";
        return;
      }
    }

    this.user.booksFinished.push(this.book.id);

    localStorage.setItem("user", JSON.stringify(this.user));

    await new Promise((resolve, reject) => {
      this.bookService
        .updateBooksLists(this.user)
        .subscribe((data: boolean) => {
          if (data) resolve();
          else reject();
        });
    });

    this.a = true;
    this.poruka = "Cestitam procitali ste knjigu '" + this.book.name + "'";
  }

  inputPages() {
    if (this.pages == null) {
      this.poruka = "Morate uneti do koje strane ste stigli!";
      this.a = false;
      return;
    }
    if (this.pages > this.book.pages) {
      alert("Ne mozete procitati vise strana nego sto knjiga zaista ima!");
      return;
    }

    console.log(this.pages);

    this.bookService
      .updateBookPage(this.user.username, this.book.id, this.pages)
      .subscribe((data: boolean) => {
        if (data) {
        }
      });

    this.pagesBool = false;
  }

  async showPagesInput() {
    this.poruka = "";
    this.commentBool = false;
    this.pages = null;

    let i: number;
    for (i = 0; i < this.user.booksReading.length; i++) {
      if (this.book.id == this.user.booksReading[i]) {
        break;
      }
    }

    if (i == this.user.booksReading.length) {
      this.poruka =
        "Da biste uneli broj stranica morate prvo zapoceti citanje knjige";
      this.a = false;
      return;
    }

    console.log(1);

    this.pagesBool = true;

    this.bookService
      .findPages(this.user.username, this.book.id)
      .subscribe(async (page: Page) => {
        if (page) {
          console.log("Page nadjen");

          this.currentPage = page;
        } else {
          console.log("Page nije nadjen");

          let newPage = new Page();

          newPage.username = this.user.username;
          newPage.idBook = this.book.id;
          newPage.page = 0;
          this.currentPage = newPage;

          await new Promise((resolve, reject) => {
            this.bookService.makeNewPage(newPage).subscribe((data: Page) => {
              if (data) resolve();
              else reject();
            });
          });
        }
      });
  }

  goToUser() {
    localStorage.setItem("book", JSON.stringify(null));

    this.router.navigate(["/user"]);
  }

  async showMakeComment() {
    this.poruka = "";
    this.pagesBool = false;

    let i: number;
    for (i = 0; i < this.user.booksReading.length; i++) {
      if (this.book.id == this.user.booksReading[i]) {
        break;
      }
    }

    if (i == this.user.booksReading.length) {
      this.poruka =
        "Da biste ostavili komentar morate prvo zapoceti citanje knjige i procitati bar 50% knjige";
      this.a = false;
      return;
    }

    await new Promise((resolve, reject) => {
      this.bookService
        .findPages(this.user.username, this.book.id)
        .subscribe(async (page: Page) => {
          if (page) {
            console.log("Page nadjen");

            this.currentPage = page;
          } else {
            console.log("Page nije nadjen");

            let newPage = new Page();

            newPage.username = this.user.username;
            newPage.idBook = this.book.id;
            newPage.page = 0;
            this.currentPage = newPage;
            await new Promise((resolve, reject) => {
              this.bookService
                .makeNewPage(newPage)
                .subscribe((data: boolean) => {
                  if (data) resolve();
                  else reject();
                });
            });
          }

          resolve();
        });
    });

    if (this.book.pages / 2 > this.currentPage.page) {
      this.a = false;
      this.poruka =
        "Ne mozete ostaviti komentar ako niste procitali bar pola knjige";
      return;
    }

    this.newComment = new Comment();
    this.commentBool = true;
  }

  async makeComment() {
    if (this.newComment.comment.length > 1000) {
      this.poruka = "Komentar ne sme imati preko 1000 reci!";
      this.a = false;
      return;
    }

    this.newComment.username = this.user.username;

    this.newComment.idBook = this.book.id;

    await this.getComments();

    let id: number;

    if (this.allComments.length == 0 || this.allComments == null) id = -1;
    else id = this.allComments[this.allComments.length - 1].id;

    this.newComment.id = ++id;

    this.newComment.type = "book";

    this.bookService.addNewComment(this.newComment).subscribe(async (data) => {
      if (data) {
        this.poruka = "Uspesno ste ostavili komentar!";
        this.a = true;

        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].notifications == null)
            this.users[i].notifications = new Array<string>();

          for (let j = 0; j < this.users.length; j++) {
            if (this.users[i].following[j] == this.user.username) {
              this.users[i].notifications.push(
                "Korisnik " +
                  this.user.username +
                  " koga pratite je postavio komentar o knjizi " +
                  this.book.name
              );

              await new Promise((resolve, reject) => {
                this.userService
                  .updateNotifications(this.users[i])
                  .subscribe((data: Boolean) => {
                    if (data) resolve();

                    console.log(5);
                  });
              });
            }
          }
        }
      } else {
        this.poruka = "Komentar nije uspesno postavljen!";
        this.a = false;
      }
      console.log(6);
      await this.getComments();
    });
  }

  allRatings: Array<Rating>;

  async getRatings() {
    return new Promise((resolve, reject) => {
      this.bookService.getRatings().subscribe((ratings: Array<Rating>) => {
        this.allRatings = ratings;

        resolve();
      });
    });
  }

  async getComments() {
    return new Promise((resolve, reject) => {
      this.bookService.getComments().subscribe((comments: Array<Comment>) => {
        if (comments) {
          console.log(1);
          this.allComments = comments;

          resolve();
        } else reject();
      });
    });
  }

  async getUsers() {
    return new Promise((resolve, reject) => {
      this.userService.getUsers().subscribe((users: Array<User>) => {
        if (users) {
          this.users = users;

          resolve();
        } else reject();
      });
    });
  }

  seeProfile(username) {
    let seeUser: User;

    this.userService.findUser(username).subscribe((data: User) => {
      seeUser = data;

      console.log(seeUser.username);
      localStorage.setItem("seeUserProfile", JSON.stringify(seeUser));

      this.router.navigate(["/seeUserProfile"]);
    });
  }

  async deleteComment(comment: Comment) {
    this.bookService.deleteComment(comment).subscribe(async (data: boolean) => {
      if (data) {
        await this.getComments();

        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].notifications == null)
            this.users[i].notifications = new Array<string>();

          for (let j = 0; j < this.users.length; j++) {
            if (this.users[i].following[j] == this.user.username) {
              this.users[i].notifications.push(
                "Korisnik " +
                  this.user.username +
                  " koga pratite je obrisao komentar o knjizi " +
                  this.book.name
              );

              await new Promise((resolve, reject) => {
                this.userService
                  .updateNotifications(this.users[i])
                  .subscribe((data: boolean) => {
                    if (data) resolve();
                  });
              });
            }
          }
        }
      }
    });
  }

  showChangeComment(comment: Comment) {
    this.changeCommentBool = true;
    this.updateComment = "";
    this.poruka = "";
    this.commentBool = false;
    this.pagesBool = false;
    this.commentToChange = comment;
  }

  changeComment() {
    this.bookService
      .changeComment(this.commentToChange, this.updateComment)
      .subscribe(async (data: boolean) => {
        if (data) {
          this.poruka = "Komentar je uspesno promenjen!";
          this.a = true;
          this.changeCommentBool = false;

          await this.getComments();

          for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].notifications == null)
              this.users[i].notifications = new Array<string>();

            for (let j = 0; j < this.users.length; j++) {
              if (this.users[i].following[j] == this.user.username) {
                this.users[i].notifications.push(
                  "Korisnik " +
                    this.user.username +
                    " koga pratite je promenio komentar o knjizi " +
                    this.book.name
                );

                await new Promise((resolve, reject) => {
                  this.userService
                    .updateNotifications(this.users[i])
                    .subscribe((data: boolean) => {
                      if (data) resolve();
                    });
                });
              }
            }
          }
        }
      });
  }

  star1: number;
  star2: number;
  star3: number;
  star4: number;
  star5: number;
  star6: number;
  star7: number;
  star8: number;
  star9: number;
  star10: number;

  b1: boolean = true;

  checkStar1() {
    console.log(1);

    this.star1 = 1;
    this.star2 = null;
    this.star3 = null;
    this.star4 = null;
    this.star5 = null;
    this.star6 = null;
    this.star7 = null;
    this.star8 = null;
    this.star9 = null;
    this.star10 = null;

    this.star = 1;
  }

  start2: number;

  checkStar2() {
    console.log(2);

    this.star1 = 1;
    this.star2 = 2;
    this.star3 = null;
    this.star4 = null;
    this.star5 = null;
    this.star6 = null;
    this.star7 = null;
    this.star8 = null;
    this.star9 = null;
    this.star10 = null;

    this.star = 2;
  }

  checkStar3() {
    console.log(3);

    this.star1 = 1;
    this.star2 = 2;
    this.star3 = 3;
    this.star4 = null;
    this.star5 = null;
    this.star6 = null;
    this.star7 = null;
    this.star8 = null;
    this.star9 = null;
    this.star10 = null;

    this.star = 3;
  }

  checkStar4() {
    console.log(4);

    this.star1 = 1;
    this.star2 = 2;
    this.star3 = 3;
    this.star4 = 4;
    this.star5 = null;
    this.star6 = null;
    this.star7 = null;
    this.star8 = null;
    this.star9 = null;
    this.star10 = null;

    this.star = 4;
  }

  checkStar5() {
    console.log(5);

    this.star1 = 1;
    this.star2 = 2;
    this.star3 = 3;
    this.star4 = 4;
    this.star5 = 5;
    this.star6 = null;
    this.star7 = null;
    this.star8 = null;
    this.star9 = null;
    this.star10 = null;

    this.star = 5;
  }

  checkStar6() {
    console.log(6);

    this.star1 = 1;
    this.star2 = 2;
    this.star3 = 3;
    this.star4 = 4;
    this.star5 = 5;
    this.star6 = 6;
    this.star7 = null;
    this.star8 = null;
    this.star9 = null;
    this.star10 = null;

    this.star = 6;
  }

  checkStar7() {
    console.log(7);

    this.star1 = 1;
    this.star2 = 2;
    this.star3 = 3;
    this.star4 = 4;
    this.star5 = 5;
    this.star6 = 6;
    this.star7 = 7;
    this.star8 = null;
    this.star9 = null;
    this.star10 = null;

    this.star = 7;
  }

  checkStar8() {
    console.log(8);

    this.star1 = 1;
    this.star2 = 2;
    this.star3 = 3;
    this.star4 = 4;
    this.star5 = 5;
    this.star6 = 6;
    this.star7 = 7;
    this.star8 = 8;
    this.star9 = null;
    this.star10 = null;

    this.star = 8;
  }

  checkStar9() {
    console.log(9);

    this.star1 = 1;
    this.star2 = 2;
    this.star3 = 3;
    this.star4 = 4;
    this.star5 = 5;
    this.star6 = 6;
    this.star7 = 7;
    this.star8 = 8;
    this.star9 = 9;
    this.star10 = null;
    this.star = 9;
  }

  checkStar10() {
    console.log(10);

    this.star1 = 1;
    this.star2 = 2;
    this.star3 = 3;
    this.star4 = 4;
    this.star5 = 5;
    this.star6 = 6;
    this.star7 = 7;
    this.star8 = 8;
    this.star9 = 9;
    this.star10 = 10;
    this.star = 10;
  }

  rateBool: boolean;
  star: number;

  async showRate() {
    let i: number;
    for (i = 0; i < this.user.booksReading.length; i++) {
      if (this.book.id == this.user.booksReading[i]) {
        break;
      }
    }

    if (i == this.user.booksReading.length) {
      this.poruka =
        "Da biste ostavili komentar morate prvo zapoceti citanje knjige i procitati bar 50% knjige";
      this.a = false;
      return;
    }

    await new Promise((resolve, reject) => {
      this.bookService
        .findPages(this.user.username, this.book.id)
        .subscribe(async (page: Page) => {
          if (page) {
            console.log("Page nadjen");

            this.currentPage = page;
          } else {
            console.log("Page nije nadjen");

            let newPage = new Page();

            newPage.username = this.user.username;
            newPage.idBook = this.book.id;
            newPage.page = 0;
            this.currentPage = newPage;
            await new Promise((resolve, reject) => {
              this.bookService
                .makeNewPage(newPage)
                .subscribe((data: boolean) => {
                  if (data) resolve();
                  else reject();
                });
            });
          }

          resolve();
        });
    });

    if (this.book.pages / 2 > this.currentPage.page) {
      this.a = false;
      this.poruka =
        "Ne mozete ostaviti komentar ako niste procitali bar pola knjige";
      return;
    }

    this.rateBool = true;
  }

  async rate() {
    if (this.star == null) {
      alert("Morate oceniti");
      return;
    }

    await new Promise((resolve, reject) => {
      let rating = new Rating();
      rating.username = this.user.username;
      rating.bookId = this.book.id;
      rating.note = this.star;
      this.bookService.makeRating(rating).subscribe((data: Rating) => {
        if (data) {
          console.log(data.note);

          this.book.rating *= this.book.n;

          this.book.rating -= data.note;

          this.book.n--;
          console.log("Rejting1 je " + this.book.rating);
          this.book.rating = this.book.rating / this.book.n;
          console.log("Rejting je " + this.book.rating);

          localStorage.setItem("book", JSON.stringify(this.book));
          resolve();
        } else {
          resolve();
        }
      });
    });

    if (this.book.rating == 0 || this.book.rating == null) {
      this.book.rating = this.star;
      this.book.n = 1;
    } else {
      console.log(this.book.n);

      let n = this.book.n;
      this.book.n++;
      this.book.rating = (this.book.rating * n + this.star) / this.book.n;
    }

    localStorage.setItem("book", JSON.stringify(this.book));

    this.bookService.rateBook(this.book).subscribe(async (data: boolean) => {
      if (data) {
        alert("Uspesno ste ocenili knjigu!");
        await this.getRatings();
      } else {
        alert("Doslo je do greske u ocenjivanju");
      }
    });
  }
}
