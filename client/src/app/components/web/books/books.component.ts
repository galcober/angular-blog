import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/primeng';

import { BooksService } from '../../../services/web/books.service';
import { Book } from '../../../models/Book';

import { Utils } from '../../../app.utils';

import * as $ from 'jquery';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[];

  title: string;
  isbn_10: string;
  isbn_13: string;
  autor: string;
  valoracion: number;

  // Search
  search: string;

  // Edit
  editBook: Book;
  editTitle: string;
  editAutor: string;
  editISBN10: string;
  editISBN13: string;
  editValoracion: number;

  // Messages
  msgs: Message[] = [];


  constructor(private bookService: BooksService, private utils: Utils) {
    // Book
    this.title = '';
    this.isbn_10 = '';
    this.isbn_13 = '';
    this.autor = '';
    this.valoracion = 0;

    // Search
    this.search = '';

    // Edit
    this.editBook = new Book;
    // this.editTitle = '';
    this.showAllBooks();
  }

  ngOnInit() {
  }

  showAllBooks() {
    this.bookService.getAllBooks()
      .subscribe(books => {
        this.books = books;
    });
  }

  searchBook(event) {
    if (this.search) {
      this.bookService.getBooksByTitle(this.search)
      .subscribe(books => {
        this.books = books;
      });
    } else {
      this.showAllBooks();
    }
  }

  addBook(event) {
    event.preventDefault();
    const newBook = this.utils.createBook(this.title, this.isbn_10, this.isbn_13, this.valoracion, this.autor);
    this.bookService.addBook(newBook)
      .subscribe(book => {
        this.showAllBooks();
        this.title = '';
      });
  }

  loadBookModal(book: Book) {
    this.editBook = book;
    this.editTitle = book.titulo;
    this.editAutor = book.autor;
    this.editISBN10 = book.isbn_10;
    this.editISBN13 = book.isbn_13;
    this.editValoracion = book.valoracion;
  }

  updateBook() {
    this.msgs = [];

    this.setEditModalBook();

    this.bookService.updateBook(this.editBook)
      .subscribe(res => {
        this.msgs.push({severity: 'success', summary: 'Libro editado'});
      });

      console.log('prueba: ');
  }

  setEditModalBook() {
    this.editBook.titulo = this.editTitle;
    this.editBook.autor = this.editAutor;
    this.editBook.isbn_10 = this.editISBN10;
    this.editBook.isbn_13 = this.editISBN13;
    this.editBook.valoracion = this.editValoracion;
  }

  removeBook(id) {
    if (confirm('¿Estás seguro que quieres eliminar este libro?')) {
      this.bookService.removeBook(id)
      .subscribe(res => {
        if (res === 1) {
          this.utils.deleteListItemById(id, this.books);
        }
      });
    }
  }
}
