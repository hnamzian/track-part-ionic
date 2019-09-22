import { Component } from '@angular/core';
import { Platform, Toast, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TokenStorage } from '../storage/token';
import { UserStorage } from '../storage/user';
import { AuthProvider } from '../providers/auth/auth';

import { LoginPage } from '../pages/auth/pages/login/login';
import { HomePage } from '../pages/home/home';
import { User } from '../models/User';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  user: User;

  toast: Toast;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public toastCtrl: ToastController,
    authProvider: AuthProvider,
    tokenStorage: TokenStorage,
    userStorage: UserStorage
  ) {
    platform.ready().then(async () => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //   const authToken = await tokenStorage.getAuthToken();
      //   if (!authToken) {
      //     this.rootPage = LoginPage;
      //     return;
      //   }

      //   const user$ = await authProvider.getUserProfile();
      //   user$.subscribe(
      //     async result => {
      //       this.user = result;
      //       await userStorage.setUser(this.user);
      //       this.rootPage = HomePage;
      //     },
      //     error => {
      //       if (error.status == 404) this.showToast('خطا در برقراری ارتباط');
      //       else {
      //         this.showToast(error.error.error.message);
      //       }
      //       this.rootPage = LoginPage;
      //     }
      //   );
    });
  }

  showToast(message) {
    this.toast = this.toastCtrl.create({
      message: message,
      position: 'bottom',
      duration: 2000,
      cssClass: 'toast'
    });
    this.toast.present();
  }

  dismissToast() {
    this.toast.dismiss();
  }
}
