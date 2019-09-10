import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { AuthHeaderComponent } from './components/auth-header/auth-header';
import { SelectListComponent } from './components/select-list/select-list';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [AuthHeaderComponent, SelectListComponent],
  entryComponents: [SelectListComponent],
  exports: [AuthHeaderComponent, SelectListComponent]
})
export class CoreModule {}
