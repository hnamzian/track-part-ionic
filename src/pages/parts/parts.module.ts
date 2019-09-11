import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { PartsListPage } from './parts-list/parts-list';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [PartsListPage],
  entryComponents: [PartsListPage],
  exports: []
})
export class PartsModule {}
