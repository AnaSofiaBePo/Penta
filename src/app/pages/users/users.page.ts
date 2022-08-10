import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/models/user.models';
import { FireStoreService } from 'src/app/services/fire-store.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  userList: UserI[] = [];
  constructor(private dataBase: FireStoreService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.dataBase.getCollection<UserI>('users').subscribe((users) => {
      console.log('user', users);
      this.userList = users;
    });
  }

}
