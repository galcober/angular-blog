import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../services/security/authentication.service';

import { User } from '../../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private router: Router, private auth: AuthenticationService) {}

  ngOnInit() {
  }

  loginUser(e) {
    e.preventDefault();
    console.log(e);
    const username = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    console.log(username, password);

    this.user.name = username;
    this.user.password = password;
    localStorage.setItem('currentUser', JSON.stringify({ username: this.user.name, email: this.user.name, token: 'token'}));
    this.auth.login(this.user)
      .subscribe(token => {
        console.log('Token: ' + token);
      });

    /*if (username === 'admin' && password === 'admin') {
      this.user.setUserLoggedIn();
      this.router.navigate(['dashboard']);
    }*/
    return false;
  }

}
