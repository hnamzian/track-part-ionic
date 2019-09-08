import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { AuthHeaderComponent } from './components/auth-header/auth-header';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [AuthHeaderComponent],
  entryComponents: [],
  exports: [AuthHeaderComponent]
})
export class CoreModule {}
