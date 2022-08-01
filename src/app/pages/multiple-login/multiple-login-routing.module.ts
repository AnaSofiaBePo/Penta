import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultipleLoginPage } from './multiple-login.page';

const routes: Routes = [
  {
    path: '',
    component: MultipleLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultipleLoginPageRoutingModule {}
