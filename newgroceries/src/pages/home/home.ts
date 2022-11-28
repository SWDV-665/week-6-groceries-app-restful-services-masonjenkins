import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { GroceriesProvider } from '../../providers/groceries/groceries';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items = []
  errorMessage: string

  loadItems() {
    return this.groceriesDataService.getItems().subscribe(
      items => this.items = items,
      error => this.errorMessage = <any>error
    )
  }

  constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public groceriesDataService: GroceriesProvider, public dialogDataService: InputDialogServiceProvider, public share: SocialSharing) {
    groceriesDataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems()
    })
  }

  ionViewDidLoad() {
    this.loadItems()
  }

  removeItem(item, id) {
    this.toastCtrl.create({
      message: 'Removing item "' + item.name + '"', 
      duration: 2500
    }).present()

    this.groceriesDataService.removeItem(id)
  }

  shareItem(item, index) {
    this.toastCtrl.create({
      message: 'Sharing item "' + item.name + '"', 
      duration: 2500
    }).present()

    const message = item.name + " - Quantity: " + item.quantity
    let subject = "Shared Grocery Item"

    this.share.share(message, subject).then(() => {
      this.toastCtrl.create({
        message: "Share successful.",
        duration: 2000
      })
    }).catch((error) => {
      this.toastCtrl.create({
        message: "Error sharing item.",
        duration: 2000
      })
      console.log("error:", error)
    })

  }

  addItem() {
    this.dialogDataService.showPrompt()
  }

  editItem(item, index) {
    this.dialogDataService.showPrompt(item, index) 
  }

}
