import { Book } from '../app/models/Book';
import { Post } from '../app/models/Post';

export class Utils {

    deleteListItemById(id, list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          list.splice(i, 1);
        }
      }
    }

    createBook(title, isbn_10, isbn_13, valoracion, autor) {
      const newBook: Book = {
        titulo: title,
        isbn_10: isbn_10,
        isbn_13: isbn_13,
        valoracion: valoracion,
        autor: autor
      };
      return newBook;
    }

    createPost(title, summary, body, authorid, imageid) {
      const newPost: Post = {
        title: title,
        summary: summary,
        body: body,
        authorid: authorid,
        imageid: imageid
      };
      return newPost;
    }

}
