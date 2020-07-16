import { Component } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { OrderviewPage } from '../orderview/orderview.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  data = null;
  loggedInUser = '';
  autoClose = false;
  accountsbyid = undefined;
  parsedAccount:any;
  constructor(private orders: ProductsService, private modalCtrl: ModalController, private activatedRoute: ActivatedRoute, public loadingController: LoadingController) {
   this.orderDetails();
  }
  orderDetails(){
    this.orders.getSalesActivities().subscribe(res => {
      
      this.parsedAccount = res;
      console.log('yeeees',this.parsedAccount);
    })
  }
  async openOrder(order) {
    console.log("this is the order",order)
    let modal = await this.modalCtrl.create({
      
      component: OrderviewPage, 
        componentProps:{
          order: order,
        }
      });
    modal.present();
  }

}
