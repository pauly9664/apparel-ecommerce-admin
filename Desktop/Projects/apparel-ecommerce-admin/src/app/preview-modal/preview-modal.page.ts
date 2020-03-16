import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-preview-modal',
  templateUrl: './preview-modal.page.html',
  styleUrls: ['./preview-modal.page.scss'],
})
export class PreviewModalPage implements OnInit {
  img: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ModalController) { 
    this.img = this.navParams.get('img');
  }
  ngOnInit() {
  }
  close() {
    this.viewCtrl.dismiss();
  }

}
