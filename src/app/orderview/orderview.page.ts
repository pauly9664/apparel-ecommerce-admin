import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-orderview',
  templateUrl: './orderview.page.html',
  styleUrls: ['./orderview.page.scss'],
})
export class OrderviewPage implements OnInit {
  order:any;

  constructor(private navParams: NavParams, private popoverController: ModalController) {
    this.order = this.navParams.get('order');
   }

  ngOnInit() {
  
  }
  closePopover(){
    this.popoverController.dismiss();
  }

}
