import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
export interface Order{
  _id: string;
  delivery_status: string,
  payment_status: string,
  user_id:string
  //  getImages();
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiURL = 'http://192.168.100.35:501/api';
  constructor(public http: HttpClient, private transfer: FileTransfer) {
   }
  getImages() {
    return this.http.get(this.apiURL + '/images');
  }
  getSalesActivities():Observable<Order>{
    return this.http.get<Order>(`${this.apiURL}/getOrders`).pipe(map((response:Order)=>response));
  }
 
  deleteImage(img) {
    return this.http.delete(this.apiURL + '/images/' + img._id);
  }
  sendtext(){
    return this.http.get(`${this.apiURL}/sendtexts`);
  }
  uploadProducts(products){
    return this.http.post(`${this.apiURL}/images`, products)
  }
  uploadImage(img, desc) {
 
    // Destination URL
    let url = this.apiURL + '/images';
  
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