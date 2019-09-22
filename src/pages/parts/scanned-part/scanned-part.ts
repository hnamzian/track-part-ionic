import { Component, OnInit } from '@angular/core';
import {
  NavParams,
  Toast,
  ToastController,
  NavController
} from 'ionic-angular';
import { Part } from '../../../models/Part';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PartsProvider } from '../../../providers/parts/parts';
import { PartsListPage } from '../parts-list/parts-list';

@Component({
  selector: 'scanned-part',
  templateUrl: 'scanned-part.html'
})
export class ScannedPartPage implements OnInit {
  partForm: FormGroup;

  part = {} as Part;

  toast: Toast;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public partsProvider: PartsProvider
  ) {
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

  async _createPart(part) {
    const part$ = await this.partsProvider.createPart(part);
    part$.subscribe(
      parts => {
        this.showToast('قطعه جدید با موفقیت افزوده شد');
        this.navCtrl.push(PartsListPage);
      },
      error => {
        if (error.status == 404) this.showToast('خطا در برقراری ارتباط');
        else {
          this.showToast(error.error.error.message);
        }
      }
    );
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
