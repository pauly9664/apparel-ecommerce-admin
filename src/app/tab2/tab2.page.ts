import { Component } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private textProvider:ProductsService) {}
  sendtexts(){
    this.textProvider.sendtext().subscribe();
  }
}
