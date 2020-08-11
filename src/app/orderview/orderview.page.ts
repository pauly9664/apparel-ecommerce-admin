import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController, ModalController, NavController } from '@ionic/angular';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-orderview',
  templateUrl: './orderview.page.html',
  styleUrls: ['./orderview.page.scss'],
})
export class OrderviewPage implements OnInit {
  order:any;
  orderDetails:any
  orderDetail:any;
  payment = [];
  delivery = [];
  dday = [];
  amount = [];

  constructor( private popoverController: ModalController, private router: Router,private activatedRoute:ActivatedRoute, private orders: ProductsService) {
    // this.order = this.navParams.get('order');
    this.getAllOrders();
    // this.getOrderDetails();
   }

  ngOnInit() {
    this.order = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log("Ndo ii order id finally", this.orderDetails);
  }
  getAllOrders(){
    this.orders.getSalesActivities().subscribe(res => {
      this.orderDetails = res;
      console.log("These are all orders", this.orderDetails)
     
    });

   
  //   this.orderDetail = this.orderDetails.filter(orders=>{
  //     return orders._id === this.order

  //  }
   
  //  );
  
   
  }
  getDetails(){
    this.orderDetail = this.orderDetails.filter(orders=>{
      return orders._id == this.order;
      // console.log("This is the obj", orders);
    })
    // this.router.navigate(['/orderview/', this.order]);
    this.orderDetail.forEach((order =>{
      this.payment.push(order.payment_status);
      this.delivery.push(order.delivery_status);
      this.amount.push(order.amount);
      this.dday.push(order.buying_date);
      // order.delivery_status = this.delivery;
      // order.buying_date = this.dday;
      // order.amount = this.amount;

      console.log("Returned payment", this.payment)
    }))
   
   }

  closePopover(){
    this.popoverController.dismiss();
  }
  // getOrderDetails(){
  //   this.orderDetail = this.orderDetails.filter(orders=>
  //     orders._id == this.order
      
  //     );
  //     console.log("Individual Order", this.orderDetail);
  // }

}
