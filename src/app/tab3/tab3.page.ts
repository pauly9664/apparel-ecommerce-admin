import { Component } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { OrderviewPage } from '../orderview/orderview.page';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  order_form: FormGroup;
  data = null;
  loggedInUser = '';
  autoClose = false;
  accountsbyid = undefined;
  parsedAccount:any = [];
  order_ids:any;
  constructor(private orders: ProductsService, private formBuilder: FormBuilder, private modalCtrl: ModalController, private activatedRoute: ActivatedRoute, public loadingController: LoadingController) {
   this.orderDetails();
  
  }
  ngOnInit() {
  
    this.order_form = this.formBuilder.group({
      order_id: [this.order_ids]
    });
  }
  orderDetails(){
    this.orders.getSalesActivities().subscribe(res => {
      
      this.parsedAccount = res;
      console.log('yeeees',this.parsedAccount);
    })
  }
  async openOrder(order) {
  //   console.log("this is the order",order)
    let modal = await this.modalCtrl.create({
      
      component: OrderviewPage, 
        componentProps:{
          order: order,
        }
      });
    modal.present();
  // console.log("This:", order)
  
  // console.log("We are the champions", this.order_ids)
  }

}
