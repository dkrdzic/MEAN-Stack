import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Book } from "./models/book";

import { Page } from "./models/page";
import { Comment } from "./models/comment";
import { Rating } from "./models/rating";

@Injectable({
  providedIn: "root",
})
export class BookService {
  uri = "http://localhost:4000";

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get(`${this.uri}/books`);
  }

  addBook(book: Book, img: File) {
    const formData: FormData = new FormData();
    if (img != null) formData.append("profileImg", img, img.name);
    else formData.append("profileImg", img);

    formData.append("book", JSON.stringify(book));

    return this.http.post(`${this.uri}/addBook`, formData);

    //return this.http.post(`${this.uri}/registration`,user.img);
  }

  getGanres() {
    return this.http.get(`${this.uri}/getGanres`);
  }

  addGanre(ganre) {
    const data = {
      ganre: ganre,
    };

    return this.http.post(`${this.uri}/addGanre`, data);
  }

  deleteGanre(ganre) {
    const data = {
      ganre: ganre,
    };

    return this.http.post(`${this.uri}/deleteGanre`, data);
  }

  updateBooksLists(user) {
    const data = {
      user: JSON.stringify(user),
    };

    return this.http.post(`${this.uri}/updateBooksLists`, data);
  }

  updateBookPage(username: string, idBook: number, page: number) {
    const data = {
      username: username,
      idBook: idBook,
      page: page,
    };

    return this.http.post(`${this.uri}/updateBookPage`, data);
  }

  findPages(username: string, idBook: number) {
    const data = {
      username: username,
      idBook: idBook,
    };

    return this.http.post(`${this.uri}/findPages`, data);
  }

  makeNewPage(page: Page) {
    const data = {
      page: JSON.stringify(page),
    };

    return this.http.post(`${this.uri}/makeNewPage`, data);
  }

  addNewComment(comment: Comment) {
    const data = {
      comment: JSON.stringify(comment),
    };

    return this.http.post(`${this.uri}/addNewComment`, data);
  }

  getComments() {
    return this.http.get(`${this.uri}/getComments`);
  }

  deleteComment(comment: Comment) {
    const data = {
      comment: JSON.stringify(comment),
    };

    return this.http.post(`${this.uri}/deleteComment`, data);
  }

  changeComment(comment: Comment, updateComment: string) {
    const data = {
      comment: JSON.stringify(comment),
      updateComment: updateComment,
    };

    return this.http.post(`${this.uri}/changeComment`, data);
  }

  findBook(id: number) {
    const data = {
      id: id,
    };

    return this.http.post(`${this.uri}/findBook`, data);
  }

  acceptBookRequest(book: Book) {
    console.log(book.name);

    const data = {
      book: JSON.stringify(book),
    };

    return this.http.post(`${this.uri}/acceptBookRequest`, data);
  }

  changeBookName(book: Book, name: string) {
    const data = {
      book: JSON.stringify(book),
      name: name,
    };

    return this.http.post(`${this.uri}/changeBookName`, data);
  }

  changeBookAuthors(book: Book) {
    const data = {
      book: JSON.stringify(book),
    };

    return this.http.post(`${this.uri}/changeBookAuthors`, data);
  }

  changeCover(book: Book, img: File) {
    const formData: FormData = new FormData();
    if (img != null) formData.append("profileImg", img, img.name);
    else formData.append("profileImg", img);

    formData.append("book", JSON.stringify(book));

    console.log(book.id);

    return this.http.post(`${this.uri}/changeCover`, formData);
  }

  changeBookGanres(book: Book) {
    const data = {
      book: JSON.stringify(book),
    };

    return this.http.post(`${this.uri}/changeBookGanres`, data);
  }

  changeBookDescr(book: Book, newDescr: string) {
    const data = {
      book: JSON.stringify(book),
      newDescr: newDescr,
    };

    return this.http.post(`${this.uri}/changeBookDescr`, data);
  }

  changeBookDate(book: Book, newDate: string) {
    const data = {
      book: JSON.stringify(book),
      newDate: newDate,
    };

    return this.http.post(`${this.uri}/changeBookDate`, data);
  }

  changeBookPages(book: Book, newPages: string) {
    const data = {
      book: JSON.stringify(book),
      newPages: newPages,
    };

    return this.http.post(`${this.uri}/changeBookPages`, data);
  }

  rateBook(book: Book) {
    const data = {
      book: JSON.stringify(book),
    };

    return this.http.post(`${this.uri}/rateBook`, data);
  }

  makeRating(rating: Rating) {
    const data = {
      rating: JSON.stringify(rating),
    };

    return this.http.post(`${this.uri}/makeRating`, data);
  }

  getRatings() {
    return this.http.get(`${this.uri}/getRatings`);
  }
}
