import { Component, OnInit } from '@angular/core';

import { PostsService } from '../../../services/web/posts.service';

import { Post } from '../../../models/Post';

import { Utils } from '../../../app.utils';

// Import Froala Editor.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Import Angular2 plugin.
// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  posts: Post[];

  title: string;

  text1: string;

  text2: string;

  logged: boolean;

  public options: Object = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: true
  };

  public editorContent = '<p style="text-align: center;">Hola <span style="color: rgb(209, 72, 65);">Esti</span>, esto es una prueba</p><p style="text-align: center;"><span style="color: rgb(184, 49, 47);"><strong>TE QUIERO</strong></span> <s>SI NO USAS EL IPAD</s></p><p>Lista de la compra:</p><ol><li>tomates</li><li>pera</li><li>sandia</li></ol>';

  constructor(private postService: PostsService, private utils: Utils) { }

  ngOnInit() {
    this.showAllPosts();
    this.logged = false;
    if (localStorage.getItem('currentUser')) {
      this.logged = true;
    }
  }

  showAllPosts() {
    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  logout() {
    console.log('Click!');
    localStorage.clear();
  }

  createPost(event) {
    event.preventDefault();
    console.log(this.editorContent);
    // const newPost = this.utils.createPost(this.title, 'Esto es el segundo post.', 'Donde descubriras que todos los post son chulos.', 1, 1);
    /*this.postService.insertPost(newPost)
      .subscribe(post => {
        this.showAllPosts();
        this.title = '';
      });*/
  }

}
