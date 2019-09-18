import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Part } from '../../../models/Part';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'scanned-part',
  templateUrl: 'scanned-part.html'
})
export class ScannedPartPage implements OnInit {
  partForm: FormGroup;

  part = {} as Part;

  constructor(public navParams: NavParams, public formBuilder: FormBuilder) {
    this.part = this.navParams.get('part');
  }

  async ngOnInit() {
    this.partForm = this.formBuilder.group({
      partName: [this.part ? this.part.name : '', [Validators.required]],
      partType: [this.part ? this.part.type : '', [Validators.required]],
      serialNumber: [
        this.part ? this.part.serialNumber : '',
        [Validators.required]
      ],
      creator: [this.part ? this.part.creatorId : '', [Validators.required]],
      createdAt: [this.part ? this.part.createdAt : '', [Validators.required]]
    });
  }
}
