import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MultipleLoginPageRoutingModule } from './multiple-login-routing.module';

import { MultipleLoginPage } from './multiple-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MultipleLoginPageRoutingModule
  ],
  declarations: [MultipleLoginPage]
})
export class MultipleLoginPageModule {}
