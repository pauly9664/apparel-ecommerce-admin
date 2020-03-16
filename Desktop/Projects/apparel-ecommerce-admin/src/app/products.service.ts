import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiURL = 'http://localhost:500/api';
  constructor(public http: HttpClient, private transfer: FileTransfer) {
    
   }
  getImages() {
    return this.http.get(this.apiURL + '/images');
  }
 
  deleteImage(img) {
    return this.http.delete(this.apiURL + '/images/' + img._id);
  }
 
  uploadImage(img, desc) {
 
    // Destination URL
    let url = this.apiURL + 'images';
 
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
