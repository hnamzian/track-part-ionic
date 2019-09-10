import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  PopoverController,
  ToastController,
  Toast
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectListComponent } from '../../../core/components/select-list/select-list';

@Component({
  selector: 'user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfilePage {
  userProfileForm: FormGroup;

  userIconImage = '../../../../assets/imgs/user.png';

  positionsList = [
    {
      englishName: 'BOARD_CREATOR',
      persianName: 'تولید کننده بورد'
    },
    {
      englishName: 'BOARD_TESTER',
      persianName: 'آزمایش کننده بورد'
    },
    {
      englishName: 'RAK_CREATOR',
      persianName: 'تولید کننده رک'
    },
    {
      englishName: 'BRAK_TESTER',
      persianName: 'آزمایش کننده رک'
    },
    {
      englishName: 'SYSTEM_CREATOR',
      persianName: 'تولید کننده سیستم'
    },
    {
      englishName: 'SYSTEM_TESTER',
      persianName: 'آزمایش کننده سیستم'
    },
    {
      englishName: 'PC_CONNECTOR',
      persianName: 'نصب کننده رایانه'
    },
    {
      englishName: 'ANTENNA_CONNECTOR',
      persianName: 'نصب کننده آنتن'
    }
  ];
  userPosition;

  toast: Toast;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public popoverCtrl: PopoverController
  ) {}

  async ngOnInit() {
    this.userProfileForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      position: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  formErrorCheck() {
    console.log(this.userProfileForm.get('password'));

    const message = this.userProfileForm.get('firstName').hasError('required')
      ? ' نام الزامی است'
      : this.userProfileForm.get('lastName').hasError('required')
      ? 'نام خانوادگی  نامعتبر است'
      : this.userProfileForm.get('position').hasError('required')
      ? 'سمت  الزامی است'
      : this.userProfileForm.get('email').hasError('required')
      ? 'پست الکترونیک  نامعتبر است'
      : this.userProfileForm.get('email').hasError('email')
      ? 'پست الکترونیک نامعتبر است'
      : 'خطا';
    return message;
  }

  openPositionsList() {
    let popover = this.popoverCtrl.create(
      SelectListComponent,
      { itemsList: this.positionsList },
      { cssClass: 'listPopover' }
    );
    popover.present();
    popover.onDidDismiss(async position => {
      if (position && position.persianName) {
        this.userPosition = position;
        this.userProfileForm
          .get('position')
          .setValue(this.userPosition.persianName);
      }
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
