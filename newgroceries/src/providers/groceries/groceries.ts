import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from 'ionic-angular';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/*
  Generated class for the GroceriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroceriesProvider {

  items: any = []

  dataChanged$: Observable<boolean>
  private dataChangedSubject: Subject<boolean>
  baseUrl = 'http://localhost:8080'

  constructor(public toastCtrl: ToastController, public http: HttpClient) {
    console.log('Hello GroceriesProvider Provider');

    this.dataChangedSubject = new Subject<boolean>()
    this.dataChanged$ = this.dataChangedSubject.asObservable()
  }

  // removeItem(index) {
  //   this.items.splice(index, 1)
  // }

  removeItem(id) {
    console.log("Removing item with ID: ", id)
    this.http.delete(this.baseUrl + "/api/groceries/" + id).subscribe(res => {
      this.items = res 
      this.dataChangedSubject.next(true)
    })
  }

  addItem(item) {
    this.toastCtrl.create({
      message: 'Adding item "' + item.name + '"', 
      duration: 2500
    }).present()
    // this.items.push(item)
    this.http.post(this.baseUrl + "/api/groceries", item).subscribe(res => {
      this.items = res;
      this.dataChangedSubject.next(true);
    });
  }

  editItem(item, index) {
    this.toastCtrl.create({
      message: 'Editing item from "' + this.items[index].name + '" Quantity ' + this.items[index].quantity + ' to "' + item.name + '" Quantity ' + item.quantity, 
      duration: 4000
    }).present()
    // this.items[index] = item
    this.http.put(this.baseUrl + "/api/groceries/" + item._id, item).subscribe( res => {
      this.items = res;
      this.dataChangedSubject.next(true);
    });
  }

  getItems() {
    return this.http.get(this.baseUrl + '/api/groceries').pipe(
      map(this.extractData),
      catchError(this.handleError)
    )
  }

  private extractData(res: Response) {
    let body = res 
    return body || {}
  }

  private handleError(error: Response | any) {
    let errMsg: string 
    if(error instanceof Response) {
      const err = error || ''
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`

    } else {
      errMsg = error.message ? error.message : error.toString()
    }
    console.error(errMsg)
    return Observable.throw(errMsg)
  }


}
