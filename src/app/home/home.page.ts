import { Component } from '@angular/core';
import { AlertsService } from '../services/alerts.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private alerts: AlertsService
  ) {}

  present(){
    this.alerts.presentLoading();
  }

  close(){
    this.alerts.closeLoading();
  }
}
