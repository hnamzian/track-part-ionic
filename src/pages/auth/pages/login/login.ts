import { Component, OnInit } from '@angular/core';
import { NavController, Toast, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  headerImageUrl = '../../assets/imgs/car.png';
  headerTitle = 'حساب کاربری';

  loginForm: FormGroup;

  toast: Toast;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      mobileNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  formErrorCheck() {
    const message = this.loginForm.get('mobileNumber').hasError('required')
      ? 'شماره همراه الزامی است'
      : this.loginForm.get('mobileNumber').hasError('minlength')
      ? 'شماره همراه نامعتبر است'
      : this.loginForm.get('mobileNumber').hasError('maxlength')
      ? 'شماره همراه نامعتبر است'
      : this.loginForm.get('password').hasError('required')
      ? 'رمز عبور الزامی است'
      : 'خطا';
    return message;
  }

  navToRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

  showToast(message) {
    this.toast = this.toastCtrl.create({
      message: message,
      position: 'bottom',
      duration: 1000,
      cssClass: 'toast'
    });
    this.toast.present();
  }

  dismissToast() {
    this.toast.dismiss();
  }
}
