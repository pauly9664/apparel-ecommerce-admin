import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-products-upload',
  templateUrl: './products-upload.page.html',
  styleUrls: ['./products-upload.page.scss'],
})
export class ProductsUploadPage implements OnInit {
  productsForm : FormGroup;
  selectedFile = null;
  constructor(private uploads: ProductsService, public formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.productsForm = this.formBuilder.group({
      description: ['', ],
      category: ['', ],
      price: ['', ],
      count: ['', ],
    });
  }
  onFileSelected(event){
    this.selectedFile = event.target.files[0];
    console.log(event);
  }
  uploadnow(){
    const productUpload = new FormData();
    productUpload.append('description', this.productsForm.get('description').value);
    productUpload.append('category', this.productsForm.get('category').value);
    productUpload.append('price', this.productsForm.get('price').value)
    productUpload.append('count', this.productsForm.get('count').value)
    productUpload.append('image',this.selectedFile, this.selectedFile.name);
    //const imagesDetails = this.productsForm.value;
    return this.uploads.uploadProducts(productUpload).subscribe(res=>{
      console.log(res);
    });
  }
}
