import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  PopoverController,
  ToastController,
  Toast
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfilePage {
  userProfileForm: FormGroup;

  userIconImage = '../../../../assets/imgs/user.png';

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
      email: ['', [Validators.required, Validators.email]]
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
      : 'خطا';
    return message;
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
