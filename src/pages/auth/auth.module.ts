import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { CoreModule } from "../core/core.module"

import { LoginPage } from './pages/login/login';

@NgModule({
  imports: [CommonModule, IonicModule, CoreModule],
  declarations: [LoginPage],
  entryComponents: [LoginPage],
  exports: []
})
export class AuthModule {}
