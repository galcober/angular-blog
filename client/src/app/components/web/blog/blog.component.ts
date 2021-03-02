import { Component, OnInit } from '@angular/core';

import { PostsService } from '../../../services/web/posts.service';

import { Post } from '../../../models/Post';

import { Utils } from '../../../app.utils';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts: Post[];

  title: string;

  constructor(private postService: PostsService, private utils: Utils) {
    // Post
    this.title = '';
  }

  ngOnInit() {
    this.showAllPosts();
  }

  showAllPosts() {
    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  createPost(event) {
    event.preventDefault();
    const newPost = this.utils.createPost(this.title, 'Esto es el segundo post.', 'Donde descubriras que todos los post son chulos.', 1, 1);
    this.postService.insertPost(newPost)
      .subscribe(post => {
        this.showAllPosts();
        this.title = '';
      });
  }

}
