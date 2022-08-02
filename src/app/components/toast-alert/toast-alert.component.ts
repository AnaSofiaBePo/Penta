import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-toast-alert',
  templateUrl: './toast-alert.component.html',
  styleUrls: ['./toast-alert.component.scss'],
})
export class ToastAlertComponent implements OnInit {
message: string;
  constructor(private toastController: ToastController ) { }

  ngOnInit() {
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
    });
    toast.present();
  }
}
