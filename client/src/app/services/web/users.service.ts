import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Properties } from '../../app.properties';
import 'rxjs/add/operator/map';

import { User } from '../../models/User';

@Injectable()
export class UsersService {
  api_users_url: string = Properties.APP_BASE_URL +
                     Properties.API_VERSION +
                     Properties.API_SERVICE_USERS;

  constructor(private http: HttpClient) { }

  getUserByName(name: string) {
    const api_users_url = this.api_users_url + `/${name}`;
    return this.http.get<User>(api_users_url)
      .map(res => res[0]);
  }

}
