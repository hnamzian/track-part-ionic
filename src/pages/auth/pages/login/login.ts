import { Component, OnInit } from '@angular/core';
import { NavController, Toast, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterProfilePage } from '../../../user/pages/register-profile/register-profile';

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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  formErrorCheck() {
    const message = this.loginForm.get('email').hasError('required')
      ? 'پست الکترونیک  نامعتبر است'
      : this.loginForm.get('email').hasError('email')
      ? 'پست الکترونیک نامعتبر است'
      : this.loginForm.get('password').hasError('required')
      ? 'رمز عبور الزامی است'
      : null;
    return message;
  }

  loginUser() {
    const errorMessage = this.formErrorCheck();
    if (errorMessage) return this.showToast(errorMessage)
  }

  navToRegisterPage() {
    this.navCtrl.push(RegisterProfilePage);
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
