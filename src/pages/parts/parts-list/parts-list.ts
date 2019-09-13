import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@Component({
  selector: 'parts-list',
  templateUrl: 'parts-list.html'
})
export class PartsListPage implements OnInit {
  allParts = [
    {
      id: '12345678',
      partName: 'ردیاب',
      createdAt: '01/12/1398',
      creator: 'اریاتک',
      state: 'تست شده',
      partType: 'BOARD'
    },
    {
      id: '12480312',
      partName: 'rk-123',
      createdAt: '01/12/1398',
      creator: 'اریاتک',
      state: 'تست شده',
      partType: 'RAK'
    }
  ];
  parts;

  constructor(private qrScanner: QRScanner) {}

  ngOnInit() {}

  changePartType(ev) {
    this.parts = [];
    if (ev.value == 'boards') {
      this.parts = this.allParts.filter(part => {
        if (part.partType == 'BOARD') return part;
      });
    } else if (ev.value == 'raks') {
      this.parts = this.allParts.filter(part => {
        if (part.partType == 'RAK') return part;
      });
    } else if (ev.value == 'systems') {
      this.parts = this.allParts.filter(part => {
        if (part.partType == 'SYSTEM') return part;
      });
    } else if (ev.value == 'pcs') {
      this.parts = this.allParts.filter(part => {
        if (part.partType == 'PC') return part;
      });
    } else if (ev.value == 'antennas') {
      this.parts = this.allParts.filter(part => {
        if (part.partType == 'ANTENNA') return part;
      });
    }
  }

  openScanner() {
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
}
