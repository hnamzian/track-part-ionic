import { Component, OnInit } from '@angular/core';
import {
  NavController,
  ToastController,
  Toast,
  PopoverController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectListComponent } from '../../../core/components/select-list/select-list';

@Component({
  selector: 'register-profile',
  templateUrl: 'register-profile.html'
})
export class RegisterProfilePage implements OnInit {
  headerImageUrl = '../../assets/imgs/person.png';
  headerTitle = 'اطلاعات شخصی';

  userIconImage = '../../assets/imgs/person.png';

  userProfileForm: FormGroup;

  positionsList = [
    {
      englishName: 'BOARD_CREATOR',
      persionName: 'تولید کننده بورد'
    },
    {
      englishName: 'BOARD_TESTER',
      persionName: 'آزمایش کننده بورد'
    },
    {
      englishName: 'RAK_CREATOR',
      persionName: 'تولید کننده رک'
    },
    {
      englishName: 'BRAK_TESTER',
      persionName: 'آزمایش کننده رک'
    },
    {
      englishName: 'SYSTEM_CREATOR',
      persionName: 'تولید کننده سیستم'
    },
    {
      englishName: 'SYSTEM_TESTER',
      persionName: 'آزمایش کننده سیستم'
    },
    {
      englishName: 'PC_CONNECTOR',
      persionName: 'نصب کننده رایانه'
    },
    {
      englishName: 'ANTENNA_CONNECTOR',
      persionName: 'نصب کننده آنتن'
    }
  ];

  toast: Toast;

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder
  ) {}

  async ngOnInit() {
    this.userProfileForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      position: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  formErrorCheck() {
    console.log(this.userProfileForm.get('password'));

    const message = this.userProfileForm.get('firstName').hasError('required')
      ? ' نام الزامی است'
      : this.userProfileForm.get('lastName').hasError('required')
      ? 'نام خانوادگی  نامعتبر است'
      : this.userProfileForm.get('email').hasError('required')
      ? 'پست الکترونیک  نامعتبر است'
      : this.userProfileForm.get('email').hasError('email')
      ? 'پست الکترونیک نامعتبر است'
      : this.userProfileForm.get('password').hasError('required')
      ? 'رمز ورود الزامی است'
      : this.userProfileForm.get('password').hasError('minlength')
      ? `رمز عبور باید حداقل شامل ${
          this.userProfileForm.get('password').errors.minlength.requiredLength
        } حرف باشد`
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
