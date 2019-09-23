import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { CoreModule } from '../core/core.module';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { RegisterProfilePage } from './pages/register-profile/register-profile';
import { UserProfilePage } from './pages/user-profile/user-profile';
import { ProfileQRPage } from './pages/profile-qr/profile-qr';

@NgModule({
  imports: [CommonModule, IonicModule, CoreModule, NgxQRCodeModule],
  declarations: [RegisterProfilePage, UserProfilePage, ProfileQRPage],
  entryComponents: [RegisterProfilePage, UserProfilePage, ProfileQRPage]
})
export class UserModule {}
