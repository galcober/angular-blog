import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Properties } from '../../app.properties';
import { User } from '../../models/User';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationService {
  api_users_url: string = Properties.APP_BASE_URL +
                     Properties.API_VERSION +
                     Properties.API_SERVICE_BOOKS;

  constructor(private http: HttpClient) { }

  login(user: User) {
    const token = jwt.sign(user, 'test', { expiresIn: 900});
    localStorage.setItem('currentUser', JSON.stringify({ username: user.name, email: user.email, token: token}));
    // console.log('Token: ' + token);
    /*return this.http.post<User>(this.api_users_url, user)
      .map(res => res);*/
    return token;
  }

}
