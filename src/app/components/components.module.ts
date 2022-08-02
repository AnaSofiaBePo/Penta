import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastAlertComponent } from './toast-alert/toast-alert.component';



@NgModule({
  declarations: [ToastAlertComponent],
  imports: [
    CommonModule
  ],
  exports: [ToastAlertComponent]
})
export class ComponentsModule { }
