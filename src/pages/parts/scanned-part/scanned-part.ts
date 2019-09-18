import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Part } from '../../../models/Part';

@Component({
  selector: 'scanned-part',
  templateUrl: 'scanned-part.html'
})
export class ScannedPartPage implements OnInit {
  part = {} as Part;

  constructor(public navParams: NavParams) {
    this.part = this.navParams.get('part');
  }

  async ngOnInit() {}
}
