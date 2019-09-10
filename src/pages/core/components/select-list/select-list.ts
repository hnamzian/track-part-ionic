import { Component } from "@angular/core";
import { ViewController, NavParams } from "ionic-angular";

@Component({
  selector: "select-list",
  templateUrl: "select-list.html"
})
export class SelectListComponent {
  itemsList;

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    this.itemsList = navParams.get("itemsList");
  }

  selectItem(item) {
    this.viewCtrl.dismiss(item, "", { animate: false });
  }
}
