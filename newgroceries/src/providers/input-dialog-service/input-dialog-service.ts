import { Injectable } from '@angular/core';
import { AlertController, ModalController } from 'ionic-angular';
import { GroceriesProvider } from '../groceries/groceries';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class InputDialogServiceProvider {

  constructor(private modalCtrl: ModalController ,public alertCtrl: AlertController, public groceriesDataService: GroceriesProvider) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  showPrompt(item?, index?) {
    this.alertCtrl.create({
      title: item ? "Edit Item" : "Add Item",
      message: item ? "Edit item details." : "Add item details.",

      inputs: [
        {
          name: "name",
          placeholder: "Name",
          value: item ? item.name : null
        },
        {
          name: "quantity",
          placeholder: "Quantity",
          value: item ? item.quantity : null,
          type: "select"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {}
        },
        {
          text: "Save",
          handler: data => {
            item ? this.groceriesDataService.editItem(data, index) : this.groceriesDataService.addItem(data)
          }
        }
      ]
    }).present()

  }

  showModal(item?, index?) {
    const modal = this.modalCtrl.create('ModalPage', { data: item })

    modal.present()

    modal.onDidDismiss((data) => {
      console.log(data)
    })
  }

}
