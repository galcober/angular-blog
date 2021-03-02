import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Properties } from '../../app.properties';
import 'rxjs/add/operator/map';

import { Post } from '../../models/Post';

@Injectable()
export class PostsService {
  api_posts_url: string = Properties.APP_BASE_URL +
                     Properties.API_VERSION +
                     Properties.API_SERVICE_POSTS;

  constructor(private http: HttpClient) { }

  getAllPosts() {
    return this.http.get<Post[]>(this.api_posts_url)
      .map(res => res);
  }

  getPostById(id: string) {
    const api_posts_url = this.api_posts_url + `/${id}`;
    return this.http.get<Post>(api_posts_url)
      .map(res => res[0]);
  }

  insertPost(newPost: Post) {
    return this.http.post<Post>(this.api_posts_url, newPost)
      .map(res => res);
  }

}
