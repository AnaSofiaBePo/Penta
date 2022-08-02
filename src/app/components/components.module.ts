import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastAlertComponent } from './toast-alert/toast-alert.component';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ToastAlertComponent,MenuComponent],
  imports: [
    CommonModule, IonicModule, RouterModule,
  ],
  exports: [ToastAlertComponent, MenuComponent]
})
export class ComponentsModule { }
