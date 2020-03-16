import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import {  NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.page.html',
  styleUrls: ['./upload-modal.page.scss'],
})
export class UploadModalPage implements OnInit {
  imageData: any;
  desc: string;
  constructor(public navCtrl: NavController,  private viewCtrl: ModalController, private imagesProvider: ProductsService) { }

  ngOnInit() {
  }
  saveImage() {
    this.imagesProvider.uploadImage(this.imageData, this.desc).then(res => {
      this.viewCtrl.dismiss({reload: true});
    }, err => {
      this.dismiss();
    });
  }
 
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
