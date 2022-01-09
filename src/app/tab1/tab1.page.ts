import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PreviewModalPage } from '../preview-modal/preview-modal.page';
// import { UploadModalPage } from '../upload-modal/upload-modal.page';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
import { FormControl } from '@angular/forms';
import { element } from 'protractor';
import { ViewSalePage } from '../view-sale/view-sale.page';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  images: any = [];
  searchControl:FormControl;
  prods: any;
  el:any
  salesCount: any
  products = []
  searchResult: any;
  product: Object
  sliderConfig = {
    spaceBetween: 5,
    centeredSlides: true,
    slidesPerView: 2

  }
  constructor(public navCtrl: NavController, private authService: AuthserviceService, private imagesProvider: ProductsService, private router: Router, private camera: Camera, private actionSheetCtrl: ActionSheetController, private modalCtrl: ModalController) {
    // this.reloadImages();
    // this.fetchSale();
    this.getSalesC();
    this.imagesProvider.fetchSales().subscribe(sales=>{
    
      this.product = sales
      // this.products.push(this.product)
      // this.products.forEach(element => {
      // this.el = element.item_list.split(',')
      // });
      console.log("Sales 2", this.product)
    })
    // console.log("Sales ",this.product);
  }
  FilterArrayObjects(ev:any){
    this.prods = ev.target.value;
    console.log("event data",this.prods);
    if(this.prods && this.prods.trim() != ''){
      this.images = this.images.filter((item)=>{
        // this.productCategory.push(item.category);
        
        return(item.description.toLowerCase().indexOf(this.prods.toLowerCase())>-1)
      })
    }
  }
getSalesC(){
  this.imagesProvider.getSalesCount().subscribe(element=>[
    this.salesCount = element
  ])
  }
  reloadImages() {
    this.imagesProvider.getImages().subscribe(data => {
      this.images = data;
      console.log(this.images);
    });
  }
 
  deleteImage(img) {
    this.imagesProvider.deleteImage(img).subscribe(data => {
      this.reloadImages();
    });
  }
 
  async openImage(img) {
    console.log("This is the image", img);
    let modal = await this.modalCtrl.create({
      component: PreviewModalPage, 
        componentProps:{
          img: img,
        }
      });
    modal.present();
  }
  logout() {
    this.authService.logout();
}
 
  async presentActionSheet() {
    let actionSheet =  await this.actionSheetCtrl.create({
      // title: 'Select Image Source',
      buttons: [
        {
          text: 'Load Items',
          handler: () => {
            this.reloadImages();
          }
        },
        {
          text: 'Upload new items',
          handler: () => {
            this.router.navigate(["/products-upload"]);
            //this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
       
        {
          text: 'Logout',
          handler: () => {
            this.logout();
            this.router.navigate(["/login"])
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
  async openImager(img) {
    console.log(img)
    let modal = await this.modalCtrl.create({
      
      component: ViewSalePage, 
        componentProps:{
          img: img,
        }
      });
    modal.present();
  }
 
  // public takePicture(sourceType) {
  //   // Create options for the Camera Dialog
  //   var options = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     sourceType: sourceType,
  //     saveToPhotoAlbum: false,
  //     correctOrientation: true
  //   };
 
  //   // Get the data of an image
  //    this.camera.getPicture(options).then((imagePath) => {
  //     let modal =  this.modalCtrl.create({
  //       component: UploadModalPage,
  //       componentProps:{
  //         data: imagePath
  //       }
  //      });
  //     //modal.present();
  //     // modal.onDidDismiss(data => {
  //     //   if (data && data.reload) {
  //     //     this.reloadImages();
  //     //   }
  //     // });
  //   }, (err) => {
  //     console.log('Error: ', err);
  //   });
  // }
}