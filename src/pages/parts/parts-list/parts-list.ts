import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { PartsProvider } from '../../../providers/parts/parts';
import { PartsStorage } from '../../../storage/parts';
import { Toast, ToastController, NavController } from 'ionic-angular';
import { ScannedPartPage } from '../scanned-part/scanned-part';
import { Part } from '../../../models/Part';

@Component({
  selector: 'parts-list',
  templateUrl: 'parts-list.html'
})
export class PartsListPage implements OnInit {
  allParts = [] as Part[];
  parts;

  toast: Toast;

  constructor(
    public navCtrl: NavController,
    private qrScanner: QRScanner,
    public toastCtrl: ToastController,
    public partsProvider: PartsProvider,
    public partsStorage: PartsStorage
  ) {}

  async ngOnInit() {
    await this.getAllParts();
  }

  changePartType(ev) {
    this.parts = [];
    if (ev.value == 'boards') {
      this.parts = this.allParts.filter(part => {
        if (part.type == 'BOARD') return part;
      });
    } else if (ev.value == 'raks') {
      this.parts = this.allParts.filter(part => {
        if (part.type == 'RAK') return part;
      });
    } else if (ev.value == 'systems') {
      this.parts = this.allParts.filter(part => {
        if (part.type == 'SYSTEM') return part;
      });
    } else if (ev.value == 'pcs') {
      this.parts = this.allParts.filter(part => {
        if (part.type == 'PC') return part;
      });
    } else if (ev.value == 'antennas') {
      this.parts = this.allParts.filter(part => {
        if (part.type == 'ANTENNA') return part;
      });
    }
  }

  async getAllParts() {
    const allParts$ = await this.partsProvider.getParts();
    allParts$.subscribe(
      async parts => {
        this.allParts = parts;
        await this.partsStorage.setParts(this.allParts);
      },
      error => {
        if (error.status == 404) this.showToast('خطا در برقراری ارتباط');
        else {
          this.showToast(error.error.error.message);
        }
      }
    );
  }

  scanQRCode() {
    this.qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.qrScanner.show();
          window.document.getElementsByTagName('body')[0].style.opacity = '0';

          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            window.document.getElementsByTagName('body')[0].style.opacity = '1';
            this.qrScanner.hide();
            scanSub.unsubscribe();
            const part = JSON.parse(text);
            this.navCtrl.push(ScannedPartPage, { part });
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
