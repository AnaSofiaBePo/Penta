import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/models/user.models';
import { AlertsService } from 'src/app/services/alerts.service';
import { FireStoreService } from 'src/app/services/fire-store.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(
    private dataBase: FireStoreService,
    private alerts: AlertsService
  ) {}

  ngOnInit() {}

  async createNewUser() {
    await this.alerts.presentLoading('Creando usuario');
    const data: UserI = {
      name: 'Alba',
      email: 'anascarlet38@hotmail.com',
      uid: 'dsfellljndinqjndiufjiunagnjfiuua',
      password: 'Habiaunavez19**',
      profile: 'user',
      profilePhoto: null,
    };

    const path = 'Users';
    this.dataBase
      .createDoc(data, path, '0001')
      .then((res) => {
        console.log(res);
        this.alerts.closeLoading();
        this.alerts.presentToastSuccess('Usuario se ha creado exitosamente');
      })
      .catch((err) => {
        console.log(err);
        this.alerts.presentToast('Ha ocurrido un error');
      });
  }
}
