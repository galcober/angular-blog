import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/web/users.service';
import { User } from '../../../models/User';

import * as crypto from 'crypto-js';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private userService: UsersService) {}

  ngOnInit() {
  }

}
