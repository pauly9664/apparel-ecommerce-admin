import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PreviewModalPage } from '../preview-modal/preview-modal.page';
import { UploadModalPage } from '../upload-modal/upload-modal.page';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  images: any = [];
  constructor(public navCtrl: NavController, private imagesProvider: ProductsService, private camera: Camera, private actionSheetCtrl: ActionSheetController, private modalCtrl: ModalController) {
    this.reloadImages();
  }
  reloadImages() {
    this.imagesProvider.getImages().subscribe(data => {
      this.images = data;
    });
  }
 
  deleteImage(img) {
    this.imagesProvider.deleteImage(img).subscribe(data => {
      this.reloadImages();
    });
  }
 
  async openImage(img) {
    let modal = await this.modalCtrl.create({
      component: PreviewModalPage, 
        componentProps:{
          img: img,
        }});
    modal.present();
  }
 
  async presentActionSheet() {
    let actionSheet =  await this.actionSheetCtrl.create({

      // title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ],
    });
actionSheet.present();
  }
 
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
 
    // Get the data of an image
     this.camera.getPicture(options).then((imagePath) => {
      let modal =  this.modalCtrl.create({
        component: UploadModalPage,
        componentProps:{
          data: imagePath
        }
       });
      //modal.present();
      // modal.onDidDismiss(data => {
      //   if (data && data.reload) {
      //     this.reloadImages();
      //   }
      // });
    }, (err) => {
      console.log('Error: ', err);
    });
  }
}
