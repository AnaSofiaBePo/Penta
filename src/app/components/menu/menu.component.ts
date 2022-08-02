import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput, NavController } from '@ionic/angular';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() public menuId: string;
  constructor(
    private alerts: AlertsService,
    private auth: AuthService,
    private router: Router,
    private navController: NavController
  ) {}

  ngOnInit() {}

  onSplitPaneVisible(event) {
    console.log(event);
  }

  logOut() {
    this.auth.logOut();
    this.alerts.presentToastSuccess('Se ha cerrado la sesión exitosamente');
    this.router.navigate(['/login']);
  }
}
