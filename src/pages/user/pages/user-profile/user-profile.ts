import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  PopoverController,
  ToastController,
  Toast
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileQRPage } from '../profile-qr/profile-qr';
import { SelectListComponent } from '../../../core/components/select-list/select-list';
import { AuthProvider } from '../../../../providers/auth/auth';
import { UserStorage } from '../../../../storage/user';
import { User } from '../../../../models/User';
import { roleEnToFa } from '../../../../config/roles';

@Component({
  selector: 'user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfilePage {
  userProfileForm: FormGroup;

  userIconImage = '../../../../assets/imgs/user.png';

  user = {} as User;

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

  profileQR = 'sfvdf';

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public authProvider: AuthProvider,
    public userStorage: UserStorage
  ) {}

  async ngOnInit() {
    this.intiateUserProfileForm();
    await this.getUser();
  }

  intiateUserProfileForm() {
    this.userProfileForm = this.formBuilder.group({
      userId: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      position: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  setUserProfileFormValues(user: User) {
    this.userProfileForm.setValue({
      userId: [user ? user.id : ''],
      firstName: [user ? user.firstName : ''],
      lastName: [user ? user.lastName : ''],
      companyName: [user ? user.companyName : ''],
      position: [user ? roleEnToFa[user.role] : ''],
      email: [user ? user.email : '']
    });
  }

  async getUser() {
    const user = await this.userStorage.getUser();
    if (user) {
      this.user = user;
      this.setUserProfileFormValues(this.user);
    } else {
      const user$ = await this.authProvider.getUserProfile();
      user$.subscribe(
        async result => {
          this.user = result;
          this.setUserProfileFormValues(this.user);
          await this.userStorage.setUser(result);
        },
        error => {
          if (error.status == 404) this.showToast('خطا در برقراری ارتباط');
          else {
            this.showToast(error.error.error.message);
          }
        }
      );
    }
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

  generateProfileQR() {
    const qrPopover = this.popoverCtrl.create(
      ProfileQRPage,
      { profile: this.user },
      { cssClass: 'qrProfilePopover' }
    );
    qrPopover.present();
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
