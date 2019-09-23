import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { User } from '../../../../models/User';

@Component({
  selector: 'profile-qr',
  templateUrl: 'profile-qr.html'
})
export class ProfileQRPage {
  profile: User;

  profileQR: string;

  constructor(public navParams: NavParams) {
    this.profile = navParams.get('profile');
    this.profileQR = JSON.stringify(this.profile);
  }
}
