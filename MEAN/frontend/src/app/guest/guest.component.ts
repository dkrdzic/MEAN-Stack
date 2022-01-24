import { Component, OnInit } from "@angular/core";
import { BookService } from "../book.service";
import { Book } from "../models/book";
import { Router } from "@angular/router";
import { Ganre } from "../models/ganre";
import { User } from "../models/user";
import { UserService } from "../user.service";
import { HappeningComponent } from "../happening/happening.component";
import { Happening } from "../models/happening";

@Component({
  selector: "app-guest",
  templateUrl: "./guest.component.html",
  styleUrls: ["./guest.component.css"],
})
export class GuestComponent implements OnInit {
  constructor(
    private bookService: BookService,
    private router: Router,
    private userService: UserService
  ) {}

  async ngOnInit() {
    let user: User = new User();

    user.username = "guest";

    localStorage.setItem("user", JSON.stringify(user));

    await this.getBooks();
    await this.getGanres();

    let help = new Ganre();
    help.name = "";

    this.ganres.unshift(help);
  }

  author: string;
  name: string;
  ganre: string;
  a: boolean;
  poruka: string;
  ganres: Array<Ganre>;
  ganresString: Array<string>;
  books: Array<Book>;
  pretraga: Array<Book>;

  allHappenings: Array<Happening>;
  happeningsBool: boolean;
  hepArray: Array<Happening>;

  async showHappenings() {
    this.happeningsBool = true;
    this.a = false;
    this.poruka = "";

    await this.getHappenings();

    this.hepArray = new Array<Happening>();

    for (let i = 0; i < this.allHappenings.length; i++) {
      let happening = this.allHappenings[i];

      if (happening.dateEnd != null) {
        let datumPocetak = happening.dateEnd.split("-");

        let dateEnd = new Date(
          parseInt(datumPocetak[0]),
          parseInt(datumPocetak[1]) - 1,
          parseInt(datumPocetak[2])
        );

        if (dateEnd.getTime() < Date.now()) {
          await new Promise((resolve, reject) => {
            this.userService
              .updateHappening(happening.id, false)
              .subscribe((data: boolean) => {
                if (data) {
                  resolve();
                  happening.active = false;
                } else reject;
              });
          });
        }
      }

      if (happening.dateBegin != null) {
        let datumPocetak = happening.dateBegin.split("-");

        let dateBegin = new Date(
          parseInt(datumPocetak[0]),
          parseInt(datumPocetak[1]) - 1,
          parseInt(datumPocetak[2])
        );

        if (dateBegin.getTime() > Date.now()) {
          console.log(1);
          this.hepArray.push(happening);
        }
      }
      if (happening.active) {
        console.log(2);
        this.hepArray.push(happening);
      }
    }

    console.log(this.hepArray.length);
  }

  async getHappenings() {
    return new Promise((resolve, reject) => {
      this.userService.getHappenings().subscribe((data: Array<Happening>) => {
        if (data) {
          this.allHappenings = data;

          resolve();
        } else reject();
      });
    });
  }

  async getBooks() {
    return new Promise((resolve, reject) => {
      this.bookService.getBooks().subscribe((books: Array<Book>) => {
        this.books = books;
        resolve();
      });
    });
  }

  async getGanres() {
    return new Promise((resolve, reject) => {
      this.bookService.getGanres().subscribe((ganres: Array<Ganre>) => {
        this.ganres = ganres;
        resolve();
      });
    });
  }

  async search() {
    let b1: boolean;
    let b2: boolean;
    let b3: boolean;
    this.pretraga = new Array<Book>();

    this.a = false;
    this.happeningsBool = false;
    //console.log(this.ganre);

    if (
      this.emptyField(this.author) &&
      this.emptyField(this.name) &&
      this.emptyField(this.ganre)
    ) {
      this.poruka = "Barem jedno polje mora biti popunjeno!";
      this.a = false;
      return;
    }

    if (!this.emptyField(this.author)) b1 = true;
    if (!this.emptyField(this.name)) b2 = true;
    if (!this.emptyField(this.ganre)) b3 = true;

    for (let i: number = 0; i < this.books.length; i++) {
      if (b1 && !b2 && !b3) {
        for (let j: number = 0; j < this.books[i].authors.length; j++) {
          if (this.books[i].authors[j].indexOf(this.author) >= 0) {
            this.pretraga.push(this.books[i]);

            break;
          }
        }
      } else if (b2 && !b1 && !b3) {
        if (this.books[i].name.indexOf(this.name) >= 0) {
          this.pretraga.push(this.books[i]);
        }
      } else if (b3 && !b1 && !b2) {
        for (let j: number = 0; j < this.books[i].ganres.length; j++) {
          if (this.books[i].ganres[j] == this.ganre) {
            this.pretraga.push(this.books[i]);
            break;
          }
        }
      } else if (b1 && b2 && !b3) {
        let h1: boolean;
        let h2: boolean;
        for (let j: number = 0; j < this.books[i].authors.length; j++) {
          if (this.books[i].authors[j].indexOf(this.author) >= 0) {
            h1 = true;

            break;
          }
        }

        if (this.books[i].name.lastIndexOf(this.name) >= 0) {
          h2 = true;
        }

        if (h1 && h2) this.pretraga.push(this.books[i]);
      } else if (b1 && b3 && !b2) {
        let h1: boolean;
        let h2: boolean;
        for (let j: number = 0; j < this.books[i].authors.length; j++) {
          if (this.books[i].authors[j].indexOf(this.author) >= 0) {
            h1 = true;

            break;
          }
        }
        for (let j: number = 0; j < this.books[i].ganres.length; j++) {
          if (this.books[i].ganres[j] == this.ganre) {
            h2 = true;
            break;
          }
        }

        if (h1 && h2) this.pretraga.push(this.books[i]);
      } else if (!b1 && b2 && b3) {
        let h1: boolean;
        let h2: boolean;

        if (this.books[i].name.lastIndexOf(this.name) >= 0) {
          h1 = true;
        }

        for (let j: number = 0; j < this.books[i].ganres.length; j++) {
          if (this.books[i].ganres[j] == this.ganre) {
            h2 = true;
            break;
          }
        }

        if (h1 && h2) this.pretraga.push(this.books[i]);
      } else if (b1 && b2 && b3) {
        let h1: boolean;
        let h2: boolean;
        let h3: boolean;

        if (this.books[i].name.lastIndexOf(this.name) >= 0) {
          h2 = true;
        }

        for (let j: number = 0; j < this.books[i].authors.length; j++) {
          if (this.books[i].authors[j].indexOf(this.author) >= 0) {
            h1 = true;

            break;
          }
        }

        for (let j: number = 0; j < this.books[i].ganres.length; j++) {
          if (this.books[i].ganres[j] == this.ganre) {
            h3 = true;
            break;
          }
        }

        if (h1 && h2 && h3) this.pretraga.push(this.books[i]);
      }
    }

    if (this.pretraga.length > 0) this.a = true;
    else this.poruka = "Knjiga koju trazite ne postoji u bazi!";

    console.log(this.ganre);

    this.ganre = "";
  }

  emptyField(field): boolean {
    return field == "" || field == null;
  }

  goToBookPage(book: Book) {
    localStorage.setItem("book", JSON.stringify(book));

    this.router.navigate(["guest/book"]);
  }
}
