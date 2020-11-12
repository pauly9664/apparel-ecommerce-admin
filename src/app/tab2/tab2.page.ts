import { Component } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  news:any = [];

  constructor(private textProvider:ProductsService) {
    this.getOrdersCount()
  }
  getOrdersCount(){
    this.textProvider.getNewOrders().subscribe(res =>{
      this.news = res;
      console.log("Count", this.news)
    });
  }
}
