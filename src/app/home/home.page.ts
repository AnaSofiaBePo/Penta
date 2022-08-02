import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from '../services/alerts.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private alerts: AlertsService, private auth: AuthService, private router: Router) {}

  logOut() {
    this.auth.logOut();
    this.alerts.presentToastSuccess('Se ha cerrado la sesión exitosamente');
    this.router.navigate(['/login']);
  }
}
