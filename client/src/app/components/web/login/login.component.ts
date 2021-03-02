import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../services/security/authentication.service';
import { UsersService } from '../../../services/web/users.service';

import { User } from '../../../models/User';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  isCorrectPassword = false;

  constructor(private router: Router, private auth: AuthenticationService, private userService: UsersService) {}

  ngOnInit() {
  }

  loginUser(e) {
    e.preventDefault();
    const username = e.target.elements[0].value;
    const password = e.target.elements[1].value;

    if ((JSON.parse(localStorage.getItem('currentUser'))) &&
        (JSON.parse(localStorage.getItem('currentUser')).username) === username) {
      this.router.navigate(['dashboard']);
    } else {
      this.userService.getUserByName(username).subscribe(user => {
        if (user && this.checkPassword(password, user.password)) {
          this.isCorrectPassword = true;
        }
        if (this.isCorrectPassword) {
          this.setLocalStorage(username, password);
          this.router.navigate(['dashboard']);
        } else {
          console.log('Usuario y Contraseña incorrectas');
        }
      });
    }
  }

  setLocalStorage(username: string, password: string) {
    this.user.name = username;
    this.user.password = password;

    const token = crypto.HmacSHA256(JSON.parse(JSON.stringify(this.user)), 'test');
    localStorage.setItem('currentUser', JSON.stringify({ username: this.user.name, email: this.user.name, token: token}));
  }

  checkPassword(password: string, passwordCrypted: string) {
    if (String(crypto.SHA3(password, 'test')) === String(passwordCrypted)) {
      return true;
    } else {
      return false;
    }
  }

}
