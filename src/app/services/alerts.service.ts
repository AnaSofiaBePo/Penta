import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  message: string;
  loading: HTMLIonLoadingElement;
  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      icon: 'close-circle-outline',
      position: 'top',
      cssClass: 'toastWarning',
    });
    toast.present();
  }

  async presentToastSuccess(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      icon: 'checkmark-circle-outline',
      position: 'top',
      cssClass: 'toastSuccess',
    });
    toast.present();
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingController.create({
      mode: 'ios',
      message,
      spinner: 'bubbles',
      cssClass: 'loadingofLogin',
    });
    await this.loading.present();
  }

  closeLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
}
