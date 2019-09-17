import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { PartsListPage } from './parts-list/parts-list';
import { ScannedPartPage } from './scanned-part/scanned-part';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [PartsListPage, ScannedPartPage],
  entryComponents: [PartsListPage, ScannedPartPage],
  exports: []
})
export class PartsModule {}
