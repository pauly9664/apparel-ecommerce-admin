import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
export interface Order{
  _id: string;
  delivery_status: string,
  payment_status: string,
  user_id:string,
  buying_date: Date,
  amount: string
  //  getImages();
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 
  // apiURL = 'http://192.168.0.122:501/api';
  apiURL = environment.url;
  constructor(public http: HttpClient, private transfer: FileTransfer, private alertController: AlertController) {
   }
   getNewOrders(){
     return this.http.get( this.apiURL + '/api/getNewOrders')
   }
  getImages() {
    return this.http.get(this.apiURL + '/api/images');
  }
  getSalesActivities(){
    return this.http.get(this.apiURL + '/api/getOrders');
  }
  getSalesActivity():Observable<any>{
    return this.http.get<any>(this.apiURL + '/api/getOrders').pipe(map((response:any)=> response));
  }
  getSalesCount(){
    return this.http.get(this.apiURL + '/api/getTodaysSales')
  }
  updateStocks(counter){
    return this.http.patch(this.apiURL + '/api/updateStockCount', counter)
  }
  getOrder(){
    return this.http.get(this.apiURL + '/api/getOrder/:id').pipe(
      tap(res=>{
        console.log("This is the specific order", res);
      }),
   
    )
  }
  postSaleOff(sales){
    return this.http.post(this.apiURL + '/api/postSaleOff', sales)
  }
  fetchItems(){
    return this.http.get(this.apiURL + '/api/fetchitems')
  }
  fetchSales(){
    return this.http.get(this.apiURL + '/api/fetchSales')
  }
  confirmViewerShip(confirm){
    return this.http.patch(this.apiURL + '/api/confirmView', confirm);
  }
  deleteImage(img) {
    return this.http.delete('https://preeti-fashions-ad.herokuapp.com/api/images/' + img._id);
  }
  // sendtext(){
  //   return this.http.get(`${this.apiURL}/sendtexts`);
  // }
  postUser(user){
    return this.http.post('/api/userdetails/', user);
  }
  uploadProducts(products){
    return this.http.post(this.apiURL + '/api/images', products,{
      reportProgress: true,
      observe: 'events'
    })
  }
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Network Error, Please try again after a few minutes',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
  uploadImage(img, desc) {
 
    // Destination URL
    let url =  '/api/images';
  
    // File for Upload
    var targetPath = img;
 
    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: { 'desc': desc }
    };
 
    const fileTransfer: FileTransferObject = this.transfer.create();
 
    // Use the FileTransfer to upload the image
    return fileTransfer.upload(targetPath, url, options);
  }
}