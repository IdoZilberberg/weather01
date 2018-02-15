import {AlertController} from "ionic-angular";
import {Injectable} from "@angular/core";

@Injectable()
export class UtilService  {

  constructor(private alertCtrl: AlertController) {}

  alertError(message: string) {
    return this.alert('Error', message);
  }

  alert(title: string, message: string)  {

    const alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Ok']
    });

    alert.present();

  }

}
