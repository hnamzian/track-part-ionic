import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { CoreModule } from "../core/core.module"

import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';

@NgModule({
  imports: [CommonModule, IonicModule, CoreModule],
  declarations: [LoginPage, RegisterPage],
  entryComponents: [LoginPage, RegisterPage],
  exports: []
})
export class AuthModule {}
