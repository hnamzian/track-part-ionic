import { Component, OnInit } from '@angular/core';
import {
  NavParams,
  Toast,
  ToastController,
  NavController
} from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Part } from '../../../models/Part';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PartsProvider } from '../../../providers/parts/parts';
import { PartsStorage } from '../../../storage/parts';
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
    public qrScanner: QRScanner,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public partsProvider: PartsProvider,
    public partsStorage: PartsStorage
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

  async _getPartId(part) {
    const allParts = await this.partsStorage.getParts();
    const filteredPart = allParts.filter(_part => {
      if (_part.serialNumber == part.serialNumber) return _part.id;
    });
    return filteredPart[0];
  }

  async createPart() {
    const part$ = await this.partsProvider.createPart(this.part);
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

  async deliverPart() {
    this.qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.qrScanner.show();
          window.document.getElementsByTagName('body')[0].style.opacity = '0';

          let scanSub = this.qrScanner
            .scan()
            .subscribe(async (scannedText: string) => {
              window.document.getElementsByTagName('body')[0].style.opacity =
                '1';
              this.qrScanner.hide();
              scanSub.unsubscribe();

              const receiver = JSON.parse(scannedText);

              const partId = await this._getPartId(this.part);

              const delivery$ = await this.partsProvider.deliverPart(
                partId,
                receiver.id
              );
              delivery$.subscribe(
                parts => {
                  this.showToast('درخواست انتقال قطعه با موفقیت ثبت گردید');
                  this.navCtrl.push(PartsListPage);
                },
                error => {
                  if (error.status == 404)
                    this.showToast('خطا در برقراری ارتباط');
                  else {
                    this.showToast(error.error.error.message);
                  }
                }
              );
            });
        } else if (status.denied) {
          this.showToast('Access Denied');
        } else {
          this.showToast(status);
        }
      })
      .catch((e: any) =>
        this.showToast('Error Occured while scanning QR code')
      );
  }

  async confirmDelivery() {
    this.qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.qrScanner.show();
          window.document.getElementsByTagName('body')[0].style.opacity = '0';

          let scanSub = this.qrScanner
            .scan()
            .subscribe(async (scannedText: string) => {
              window.document.getElementsByTagName('body')[0].style.opacity =
                '1';
              this.qrScanner.hide();
              scanSub.unsubscribe();

              const sender = JSON.parse(scannedText);

              const partId = await this._getPartId(this.part);

              const delivery$ = await this.partsProvider.confirmDelivery(
                partId,
                sender.id
              );
              delivery$.subscribe(
                parts => {
                  this.showToast('انتقال قطعه با موفقیت انجام گردید');
                  this.navCtrl.push(PartsListPage);
                },
                error => {
                  if (error.status == 404)
                    this.showToast('خطا در برقراری ارتباط');
                  else {
                    this.showToast(error.error.error.message);
                  }
                }
              );
            });
        } else if (status.denied) {
          this.showToast('Access Denied');
        } else {
          this.showToast(status);
        }
      })
      .catch((e: any) =>
        this.showToast('Error Occured while scanning QR code')
      );
  }

  async addSubPart() {
    this.qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.qrScanner.show();
          window.document.getElementsByTagName('body')[0].style.opacity = '0';

          let scanSub = this.qrScanner
            .scan()
            .subscribe(async (scannedText: string) => {
              window.document.getElementsByTagName('body')[0].style.opacity =
                '1';
              this.qrScanner.hide();
              scanSub.unsubscribe();

              const parentPart = JSON.parse(scannedText);

              const partId = await this._getPartId(this.part);

              const delivery$ = await this.partsProvider.addSubPart(
                parentPart.id,
                partId
              );
              delivery$.subscribe(
                parts => {
                  this.showToast('افزودن به قطعه با موفقیت انجام گردید');
                  this.navCtrl.push(PartsListPage);
                },
                error => {
                  if (error.status == 404)
                    this.showToast('خطا در برقراری ارتباط');
                  else {
                    this.showToast(error.error.error.message);
                  }
                }
              );
            });
        } else if (status.denied) {
          this.showToast('Access Denied');
        } else {
          this.showToast(status);
        }
      })
      .catch((e: any) =>
        this.showToast('Error Occured while scanning QR code')
      );
  }

  async testPart(testResult) {
    const partId = await this._getPartId(this.part);

    const delivery$ = await this.partsProvider.testPart(partId, testResult);
    delivery$.subscribe(
      parts => {
        this.showToast('نتیجه آزمایش قطعه با موفقیت ثبت گردید');
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
