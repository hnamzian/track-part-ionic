import { Component, OnInit } from '@angular/core';

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

  constructor() {}

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

  openScanner() {}
}
