import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { PartsProvider } from '../../../providers/parts/parts';
import { Toast, ToastController } from 'ionic-angular';
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
    private qrScanner: QRScanner,
    public toastCtrl: ToastController,
    public partsProvider: PartsProvider
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
      parts => {
        this.allParts = parts;
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
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.qrScanner.hide();
            scanSub.unsubscribe();
          });
        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
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
