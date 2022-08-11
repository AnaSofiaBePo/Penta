import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput, MenuController, NavController } from '@ionic/angular';
import { UserI } from 'src/app/models/user.models';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import { FireStoreService } from 'src/app/services/fire-store.service';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() public menuId: string;
  isLogged;
  public user: UserI = {
    name: null,
    email: null,
    uid: null,
    id: null,
    password: null,
    profile: 'user',
    profilePhoto: null,
  };
  constructor(
    private alerts: AlertsService,
    private auth: AuthService,
    private router: Router,
    private menuController: MenuController,
    private dataBase: FireStoreService
  ) {}

  ngOnInit() {
    this.auth.stateAuth().subscribe((user) => {
      if (!user) {
        this.isLogged = user;
        this.menuClose();
        this.router.navigate(['/login']);
      } else {
        console.log(user);
        this.isLogged = true;
      this.getDataUser(user.uid);
      this.user.profilePhoto = user.photoURL;
      }
    });
  }

  logOut() {
    this.auth.logOut();
    this.menuClose();
    this.alerts.presentToastSuccess('Se ha cerrado la sesión exitosamente');
    this.router.navigate(['/login']);
  }

  menuClose() {
    this.menuController.close();
  }


  getDataUser(uid: string){
    const path = 'users';
    const id = uid;
    this.dataBase.getDataUser<UserI>(path, id).subscribe((res) =>{
      this.user = res;
    });
  }
}
