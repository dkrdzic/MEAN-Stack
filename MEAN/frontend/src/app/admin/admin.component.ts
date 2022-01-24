import { Component, OnInit } from "@angular/core";
import { User } from "../models/user";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { Book } from "../models/book";
import { BookService } from "../book.service";
import { Ganre } from "../models/ganre";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));

    this.book = new Book();
  }

  user: User;
  requestUsers: Array<User> = new Array<User>();
  a: boolean;
  poruka: string;
  section: number = 0;
  users: Array<User> = new Array<User>();
  books: Array<Book> = new Array<Book>();
  book: Book;
  authors: string;
  allGanres: Array<Ganre> = new Array<Ganre>();
  bookGanres: Array<string> = new Array<string>();
  fileToUpload: File = null;
  pendingGanre: string;
  ganreToDelete: string;

  showBookRequestsBool: boolean;

  async getUsers() {
    return new Promise((resolve, reject) => {
      this.userService.getUsers().subscribe((users: Array<User>) => {
        if (users) {
          this.users = users;

          resolve();
        }
      });
    });
  }

  async getRequests() {
    return new Promise((resolve, reject) => {
      this.userService.getRequest().subscribe((users: Array<User>) => {
        if (users) {
          this.requestUsers = users;

          resolve();
        }
      });
    });
  }

  async showRequests() {
    this.poruka = "";

    await this.getRequests();

    if (this.requestUsers == null || this.requestUsers.length == 0) {
      this.a = false;
      this.poruka = "Nema novih zahteva";
      return;
    }

    this.section = 1;
  }

  acceptUser(user: User) {
    this.userService.acceptRequest(user).subscribe(async (data) => {
      await this.getRequests();
    });
  }

  async showUsers() {
    this.poruka = "";

    await this.getUsers();

    this.section = 2;
  }

  givePrivilege(user: User) {
    this.userService.changePrivilege(user, true).subscribe(async (data) => {
      await this.getUsers();
    });
  }

  takePrivilege(user: User) {
    this.userService.changePrivilege(user, false).subscribe(async (data) => {
      await this.getUsers();
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

  async showBookForm() {
    this.poruka = "";

    //await this.getBooks();

    this.section = 3;

    await this.getGanres();
  }

  async addBook() {
    if (
      this.emptyField(this.book.name) ||
      this.emptyField(this.authors) ||
      this.emptyField(this.bookGanres) ||
      this.emptyField(this.book.date)
    ) {
      this.a = false;

      this.poruka = "Sva polja sa * moraju biti popunjena";
      return;
    }

    await this.getBooks();

    console.log(this.bookGanres[0]);

    if (
      this.emptyField(this.authors) ||
      this.emptyField(this.book.date) ||
      this.emptyField(this.bookGanres) ||
      this.emptyField(this.book.name)
    ) {
      this.poruka = "Polja sa * moraju biti popunjena!";
      this.a = false;
      return;
    }

    let authorsRegex = /^(.)*(,(.)+)*$/;

    if (!authorsRegex.test(this.authors)) {
      this.a = false;

      this.poruka = "Autor(i) se unose u obliku autor1(,autor2,autor3...)";

      return;
    }

    let autori = this.authors.split(",");

    this.book.authors = new Array<string>();

    for (let i: number = 0; i < autori.length; i++)
      this.book.authors.push(autori[i]);

    if (this.bookGanres.length > 3) {
      this.poruka = "Mozete maksimalno izabrati 3 zanra";
      this.a = false;
      return;
    }

    this.book.ganres = new Array<string>();

    for (let i: number = 0; i < this.bookGanres.length; i++)
      this.book.ganres.push(this.bookGanres[i]);

    let id: number;

    if (this.books.length == 0 || this.books == null) id = -1;
    else id = this.books[this.books.length - 1].id;

    this.book.id = ++id;
    this.book.request = false;

    this.bookService
      .addBook(this.book, this.fileToUpload)
      .subscribe(async (data) => {
        if (data) {
          this.poruka = "Uspesno ste dodali knjigu!";
          this.a = true;
        } else {
          this.poruka = "Knjiga nije dodata, doslo je do neke greske!";
          this.a = false;
        }

        await this.getBooks();
      });
  }

  onFileSelected(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  async getGanres() {
    return new Promise((resolve, reject) => {
      this.bookService.getGanres().subscribe((ganres: Array<Ganre>) => {
        this.allGanres = ganres;

        let help = new Ganre();
        help.name = "";

        this.allGanres.unshift(help);

        resolve();
      });
    });
  }

  async showGanreForm() {
    this.poruka = "";

    await this.getGanres();

    this.section = 4;
  }

  async addGanre() {
    await this.getGanres();

    console.log(this.pendingGanre);

    for (let i = 0; i < this.allGanres.length; i++) {
      if (this.pendingGanre == this.allGanres[i].name) {
        this.poruka = "Zanr " + this.pendingGanre + " vec postoji u bazi!";
        this.a = false;
        return;
      } else continue;
    }

    this.bookService.addGanre(this.pendingGanre).subscribe((data) => {
      if (data) {
        this.poruka = "Uspesno ste dodali zanr!";
        this.a = true;
      } else {
        this.poruka = "Zanr nije dodat, doslo je do neke greske!";
        this.a = false;
      }
    });
  }

  async chooseGanreToDelete() {
    this.poruka = "";

    await this.getGanres();

    this.section = 6;
  }

  async deleteGanre() {
    await this.getGanres();

    await this.getBooks();

    for (let i = 0; i < this.books.length; i++) {
      for (let j = 0; j < this.books[i].ganres.length; j++) {
        if (this.ganreToDelete == this.books[i].ganres[j]) {
          this.poruka =
            "Zanr " +
            this.ganreToDelete +
            " se ne moze obrisati jer postoji knjiga sa tim zanrom!";
          this.a = false;
          return;
        }
      }
    }

    this.bookService
      .deleteGanre(this.ganreToDelete)
      .subscribe(async (data: boolean) => {
        if (data) {
          this.poruka = "Uspesno se izbrisali zanr!";
          this.a = true;
        } else {
          this.poruka = "Zanr nije izbrisan, doslo je do neke greske!";
          this.a = false;
        }

        await this.getGanres();
      });
  }

  logout() {
    localStorage.clear();

    this.router.navigate(["/"]);
  }

  emptyField(field): boolean {
    return field == "" || field == null;
  }

  async showBookRequests() {
    this.poruka = "";

    this.section = 8;

    await this.getBooks();
  }

  acceptBookRequest(book: Book) {
    console.log(book.name);

    this.bookService.acceptBookRequest(book).subscribe(async (data) => {
      await this.getBooks();
    });
  }

  async showChangeBookInfo() {
    this.section = 10;

    await this.getBooks();
    await this.getGanres();
  }

  bookToChange: Book;

  changeBookInfo(book: Book) {
    this.section = 11;
    this.bookToChange = book;
  }

  newBookName: string;

  changeBookName() {
    if (this.newBookName == null || this.newBookName == "") {
      this.poruka = "Polje ne sme biti prazno";
      this.a = false;
      return;
    }

    this.bookService
      .changeBookName(this.bookToChange, this.newBookName)
      .subscribe(async (data: boolean) => {
        if (data) {
          this.poruka = "Uspesno ste promenili ime knjige";
          this.a = true;

          this.bookToChange.name = this.newBookName;
          this.newBookName = null;
          await this.getBooks();
        } else {
          this.poruka = "Doslo je do greske";
          this.a = false;
          return;
        }
      });
  }

  newAuthors: string;

  changeBookAuthors() {
    if (this.newAuthors == null || this.newAuthors == "") {
      this.poruka = "Polje ne sme biti prazno";
      this.a = false;
      return;
    }

    let authorsRegex = /^(.)*(,(.)+)*$/;

    if (!authorsRegex.test(this.newAuthors)) {
      this.a = false;

      this.poruka = "Autor(i) se unose u obliku autor1(,autor2,autor3...)";

      return;
    }

    let autori = this.newAuthors.split(",");

    this.bookToChange.authors = new Array<string>();

    for (let i: number = 0; i < autori.length; i++)
      this.bookToChange.authors.push(autori[i]);

    this.bookService
      .changeBookAuthors(this.bookToChange)
      .subscribe(async (data: boolean) => {
        if (data) {
          this.poruka = "Uspesno ste promenili autor(a/e) knjige";
          this.a = true;
          this.newAuthors = null;
          await this.getBooks();
        } else {
          this.poruka = "Doslo je do greske";
          this.a = false;
          return;
        }
      });
  }

  changeCover() {
    if (this.fileToUpload == null) {
      this.poruka = "Polje ne sme biti prazno";
      this.a = false;
      return;
    }

    this.bookService
      .changeCover(this.bookToChange, this.fileToUpload)
      .subscribe(async (data: boolean) => {
        if (data) {
          this.poruka = "Uspesno ste promenili naslovnu knjige";
          this.a = true;
          this.fileToUpload = null;
          await this.getBooks();
        } else {
          this.poruka = "Doslo je do greske";
          this.a = false;
          return;
        }
      });
  }

  changeBookGanres() {
    if (this.bookGanres == null) {
      this.poruka = "Polje ne sme biti prazno";
      this.a = false;
      return;
    }

    if (this.bookGanres.length > 3) {
      this.poruka = "Mozete maksimalno izabrati 3 zanra";
      this.a = false;
      return;
    }

    this.bookToChange.ganres = new Array<string>();

    for (let i: number = 0; i < this.bookGanres.length; i++)
      this.bookToChange.ganres.push(this.bookGanres[i]);

    this.bookService
      .changeBookGanres(this.bookToChange)
      .subscribe(async (data: boolean) => {
        if (data) {
          this.poruka = "Uspesno ste promenili zanr(ove) knjige";
          this.a = true;
          this.bookGanres = null;
          await this.getBooks();
        } else {
          this.poruka = "Doslo je do greske";
          this.a = false;
          return;
        }
      });
  }

  newDescr: string;

  changeBookDescription() {
    if (this.newDescr == null || this.newDescr == "") {
      this.poruka = "Polje ne sme biti prazno";
      this.a = false;
      return;
    }

    this.bookService
      .changeBookDescr(this.bookToChange, this.newDescr)
      .subscribe(async (data: boolean) => {
        if (data) {
          this.poruka = "Uspesno ste promenili opis knjige";
          this.a = true;
          this.newDescr = null;
          await this.getBooks();
        } else {
          this.poruka = "Doslo je do greske";
          this.a = false;
          return;
        }
      });
  }

  newDate: string;

  changeBookDate() {
    if (this.newDate == null || this.newDate == "") {
      this.poruka = "Polje ne sme biti prazno";
      this.a = false;
      return;
    }

    this.bookService
      .changeBookDate(this.bookToChange, this.newDate)
      .subscribe(async (data: boolean) => {
        if (data) {
          this.poruka = "Uspesno ste promenili datum izdavanja knjige";
          this.a = true;
          this.newDate = null;
          await this.getBooks();
        } else {
          this.poruka = "Doslo je do greske";
          this.a = false;
          return;
        }
      });
  }

  newPages: string;

  changeBookPages() {
    console.log(1);

    if (this.newPages == null || this.newPages == "") {
      this.poruka = "Polje ne sme biti prazno";
      this.a = false;
      return;
    }

    this.bookService
      .changeBookPages(this.bookToChange, this.newPages)
      .subscribe(async (data: boolean) => {
        if (data) {
          this.poruka = "Uspesno ste promenili broj strana knjige";
          this.a = true;
          this.newPages = null;
          await this.getBooks();
        } else {
          this.poruka = "Doslo je do greske";
          this.a = false;
          return;
        }
      });
  }
}
