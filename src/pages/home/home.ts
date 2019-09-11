import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProfilePage } from '../user/pages/user-profile/user-profile';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage {
  activatedTab = 'Profile';

  profilePage = UserProfilePage;

  constructor(public navCtrl: NavController) {}

  activateProfileTab() {
    this.activatedTab = 'Profile';
  }

  activatePartListTab() {
    this.activatedTab = 'PartList';
  }
}
