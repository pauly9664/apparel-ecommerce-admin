import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-products-upload',
  templateUrl: './products-upload.page.html',
  styleUrls: ['./products-upload.page.scss'],
})
export class ProductsUploadPage implements OnInit {
  productsForm : FormGroup;
  selectedFile = null;
  productCategory = [];
  product: any=[];
  setval: any;
  passedCategory: any;
  constructor(private uploads: ProductsService, private alertController: AlertController, private productsService: AuthserviceService, public formBuilder: FormBuilder) {
    this.filterAgain();
   }
  
  ngOnInit() {
    this.productsForm = this.formBuilder.group({
      description: ['', ],
      category: [this.passedCategory],
      price: ['', ],
      count: ['', ],
      amount: ['',],
    });
    this.setval = this.productsForm.get('category').setValue(this.passedCategory);
  }
  getCategory(ev:any){
    this.passedCategory = ev.target.value;
    console.log('Changes', this.passedCategory);
  }
  onFileSelected(event){
    this.selectedFile = event.target.files[0];
    console.log(event);
  }
  filterAgain(){
    this.productsService.getCategories().subscribe(data => {
      this.product = data;
      console.log('Cats:', this.product)
      this.product.forEach((item)=>{
        console.log("Categories", item.description);
        // if(item.category.indexOf(value) ==)
          this.productCategory.push(item.description);
        
        });
    })
  }
  uploadnow(){
    const productUpload = new FormData();
    productUpload.append('description', this.productsForm.get('description').value);
    productUpload.append('category', this.passedCategory);
    productUpload.append('price', this.productsForm.get('price').value);
    // productUpload.append('count', this.productsForm.get('count').value)
    productUpload.append('amount', this.productsForm.get('amount').value)
    productUpload.append('image',this.selectedFile, this.selectedFile.name);
    //const imagesDetails = this.productsForm.value;
    console.log("this is it", productUpload);
    return this.uploads.uploadProducts(productUpload).subscribe(res=>{
     if(res){
       this.showAlert("Success");
     }
     })
    
      // console.log(res);
  
  }
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Image Uploaded Successfully',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
}
