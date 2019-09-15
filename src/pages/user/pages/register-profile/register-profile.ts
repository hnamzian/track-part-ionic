import { Component, OnInit } from '@angular/core';
import {
  NavController,
  ToastController,
  Toast,
  PopoverController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectListComponent } from '../../../core/components/select-list/select-list';
import { AuthProvider } from '../../../../providers/auth/auth';
import { User } from '../../../../models/User';

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
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public authProvider: AuthProvider
  ) {}

  async ngOnInit() {
    this.userProfileForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      position: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  formErrorCheck() {
    const message = this.userProfileForm.get('firstName').hasError('required')
      ? ' نام الزامی است'
      : this.userProfileForm.get('lastName').hasError('required')
      ? 'نام خانوادگی  الزامی است'
      : this.userProfileForm.get('position').hasError('required')
      ? 'سمت  الزامی است'
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
      : null;

    return message;
  }

  async registerUser() {
    const errorMessage = this.formErrorCheck();
    if (errorMessage) {
    }

    const rolePersianName = this.userProfileForm.get('position').value;
    let roleEnglishName;
    for (let position of this.positionsList) {
      if (position.persianName == rolePersianName)
        roleEnglishName = position.englishName;
    }

    const user = {
      firstName: this.userProfileForm.get('firstName').value,
      lastName: this.userProfileForm.get('lastName').value,
      companyName: this.userProfileForm.get('companyName').value,
      role: roleEnglishName,
      password: this.userProfileForm.get('password').value,
      email: this.userProfileForm.get('email').value
    } as User;

    let user$ = await this.authProvider.registerUser(user);
    user$.subscribe(
      user => {
        console.log(user);
      },
      error => console.log(error)
    );
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
