import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { QRScanner } from '@ionic-native/qr-scanner';
import { CoreModule } from '../pages/core/core.module';
import { AuthModule } from '../pages/auth/auth.module';
import { UserModule } from '../pages/user/user.module';
import { PartsModule } from '../pages/parts/parts.module';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [MyApp, HomePage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CoreModule,
    AuthModule,
    UserModule,
    PartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    QRScanner
  ]
})
export class AppModule {}
