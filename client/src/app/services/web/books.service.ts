import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Properties } from '../../app.properties';
import 'rxjs/add/operator/map';

import { Book } from '../../models/Book';

@Injectable()
export class BooksService {
  api_books_url: string = Properties.APP_BASE_URL +
                     Properties.API_VERSION +
                     Properties.API_SERVICE_BOOKS;

  constructor(private http: HttpClient) { }

  getAllBooks() {
    return this.http.get<Book[]>(this.api_books_url)
      .map(res => res);
  }

  getBooksByTitle(paramsSearch: string) {
    const api_url = this.api_books_url + Properties.API_METHOD_SEARCH + `/${paramsSearch}`;
    return this.http.get<Book[]>(api_url)
      .map(res => res);
  }

  getSingleBook(id: Number) {
    const api_url = this.api_books_url + `/${id}`;
    return this.http.get<Book>(api_url)
      .map(res => res);
  }

  addBook(newBook: Book) {
    return this.http.post<Book>(this.api_books_url, newBook)
      .map(res => res);
  }

  updateBook(bookUpdated: Book) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const api_url = this.api_books_url + `/${bookUpdated.id}`;
    return this.http.put<Book>(api_url, JSON.stringify(bookUpdated), httpOptions)
      .map(res => res);
  }

  removeBook(id) {
    const api_url = this.api_books_url + `/${id}`;
    return this.http.delete(api_url)
      .map(res => res);
  }

}
