import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {}

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

  navToRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }
}
