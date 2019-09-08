import { Component, Input } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "auth-header",
  templateUrl: "auth-header.html"
})
export class AuthHeaderComponent {
  @Input() headerImage;
  @Input() headerTitle;
  @Input() leftTitle;

  constructor(public navCtrl: NavController) {}
}
