import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-sale',
  templateUrl: './view-sale.page.html',
  styleUrls: ['./view-sale.page.scss'],
})
export class ViewSalePage implements OnInit {
  img:any;

  constructor(private navParams: NavParams, private modalCtrl: ModalController) {
    this.img = this.navParams.get('img');
   }

  ngOnInit() {
  }
closeModal(){
  this.modalCtrl.dismiss();
}
}
