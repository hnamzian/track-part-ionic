import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { CoreModule } from '../pages/core/core.module';
import { AuthModule } from '../pages/auth/auth.module';
import { UserModule } from '../pages/user/user.module';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [MyApp, HomePage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CoreModule,
    AuthModule,
    UserModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
