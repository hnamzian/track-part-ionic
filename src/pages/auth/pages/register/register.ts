import { Component, OnInit } from '@angular/core';
import { NavController, Toast, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';

@Component({
  selector: 'register-page',
  templateUrl: 'register.html'
})
export class RegisterPage implements OnInit {
  headerImageUrl = '../../assets/imgs/car-login.png';
  headerTitle = 'ثبت نام';

  registerForm: FormGroup;

  toast: Toast;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  formErrorCheck() {
    const message = this.registerForm.get('email').hasError('required')
      ? 'پست الکترونیک  نامعتبر است'
      : this.registerForm.get('email').hasError('email')
      ? 'پست الکترونیک نامعتبر است'
      : this.registerForm.get('password').hasError('required')
      ? 'رمز عبور الزامی است'
      : 'خطا';
    return message;
  }

  navToLoginPage() {
    this.navCtrl.push(LoginPage);
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
