import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { OrderviewPage } from '../orderview/orderview.page';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.page.html',
  styleUrls: ['./new-orders.page.scss'],
})
export class NewOrdersPage implements OnInit {
  order_form: FormGroup;
  data = null;
  loggedInUser = '';
  autoClose = false;
  accountsbyid = undefined;
  parsedAccount:any = [];
  order_ids:any;
  orderedOrders: any = [];
  confirmView: FormGroup;
  viewership = 1;
  setval: any;
  filteredParsedAccount:any = [];

  constructor(private orders: ProductsService, private formBuilder: FormBuilder, private modalCtrl: ModalController, private activatedRoute: ActivatedRoute, public loadingController: LoadingController) {
    this.orderDetails();
   }

  ngOnInit() {
    this.order_form = this.formBuilder.group({
      order_id: [this.order_ids]
    });
    this.confirmView = this.formBuilder.group({
      view_status: [this.viewership],
      order_id: [this.order_ids],
    })
  }
  confirmviewed(id: any){
    this.setval = this.confirmView.get('view_status').setValue(this.viewership);
    this.setval = this.confirmView.get('order_id').setValue(id)
    console.log("This the id", id);
    this.orders.confirmViewerShip(this.confirmView.value).subscribe();
  }
  orderDetails(){
    this.orders.getSalesActivities().subscribe(res => {
      
      this.parsedAccount = res;
      this.filteredParsedAccount = this.parsedAccount.filter((order)=>{
     
          return(order.viewed_status === 0)
      

      })
     
      console.log('yeeees',this.parsedAccount);
    })

    // this.parsedAccount.sort((a,b)=>b.buying_date - a.buying_date)
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
