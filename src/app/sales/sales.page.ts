import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { element } from 'protractor';
// import { privateDecrypt } from 'crypto';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
  productsForm : FormGroup;
  dbcountForm: FormGroup;
  item: Object;
  product:any;
  productCategory=[]
  sum:any;
  sumNum:any;
  sumArray=[];
  itemArray=[]
  testForm2 = []
  testForm3 = []
  itemString = ''
  passedItem :any
  selectedItem:any
  filteredObj:any
  setval: any;
  prod:any;
  constructor(public formBuilder: FormBuilder,private alertController: AlertController, public items: ProductsService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.filterAgain();
    this.items.fetchItems().subscribe(data =>{
      this.item = data
      console.log("Itemized", this.item)
    })
    this.dbcountForm = this.formBuilder.group({
      id: ['',],
      counter: ['',]
    })
    this.productsForm = this.formBuilder.group({
      description: ['',],
      id: ['',],
      customer: ['', ],
      email:['', [Validators.required, Validators.email]],
      category: ['',],
      units: ['',  [Validators.required, Validators.maxLength(10)],],
      price: ['', [Validators.required, Validators.maxLength(10)],],
      number: ['', [Validators.required, Validators.maxLength(10)],],
      count: ['', ],
      amount: ['',],
      amount2:['',],
      sizes: ['',],
      item_name: ['',],
      item_list: [this.itemString]
    });
    this.setval = this.productsForm.get('category').setValue(this.passedItem);
  }
  getProduct(){
    var count = this.productsForm.get('units').value
    var price = this.productsForm.get('price').value
    this.prod = count * price
    this.productsForm.get('amount').setValue(this.prod)
    console.log("totale", this.prod)
  }
  getItem(ev:any){
    this.passedItem = ev.target.value;
   
    console.log('Changes', this.passedItem);
    this.filteredObj = this.product.filter(other=>
      other.name == this.passedItem
  )
    console.log("Filtered Object", this.filteredObj)
    this.filteredObj.forEach(element => {
      this.productsForm.get('item_name').setValue(element.name)
      this.productsForm.get('description').setValue(element.description)
      this.productsForm.get('id').setValue(element._id)
      console.log('IIIIID', element._id);
      this.productsForm.get('count').setValue(element.count)
      this.productsForm.get('price').setValue(element.price)
    });
    this.passedItem = this.selectedItem
  }
  filterAgain(){
    this.items.fetchItems().subscribe(data => {
      this.product = data;
      console.log('Cats:', this.product)
      this.product.forEach((item)=>{
        console.log("Categories", item);
        // if(item.category.indexOf(value) ==)
          this.productCategory.push(item.name);
        
        });
    })
  }
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: "bubbles",
      duration: 800,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
}
updateStock(){
  return this.items.updateStocks(this.productsForm.value).subscribe();
}
  uploadnow(){
    const pushToArray = new FormData()
    this.getProduct();
    pushToArray.append('item_name', this.productsForm.get('item_name').value)
    pushToArray.append('price', this.productsForm.get('price').value);
    pushToArray.append('amount', this.productsForm.get('amount').value);
    // pushToArray.append('customer', this.productsForm.get('customer').value)
    // pushToArray.append('number', this.productsForm.get('number'). value)
    // pushToArray.append('email', this.productsForm.get('email').value)
    pushToArray.append('units', this.productsForm.get('units').value);
    
    // const value = Object.fromEntries(pushToArray.entries)
    // const value =JSON.stringify(pushToArray);
    // this.itemArray.push(pushToArray)
    
    var obj = {};
pushToArray.forEach(function(value, key){
    obj[key] = value;
   
});
// var json = JSON.stringify(obj);

 this.itemArray.push(obj)

 this.testForm3 = [];
 this.itemArray.forEach((item)=>{
   
   this.testForm3.push(item.item_name + ' (' + item.price  + ' )' + ' x ' + item.units + ' - ' + item.amount)
 });
 this.sumArray = []
 this.itemArray.forEach((sum=>{
   const num = Number(sum.amount)
   this.sumArray.push(num)
 }))
 
this.sum = this.sumArray.reduce((a, b)=>a+b, 0)
// this.sumNum = Number(this.sum)
 this.itemString = this.testForm3.toString()
 console.log("Array ya sum", this.sumArray)
 console.log("Ndo ii total", this.sum);
 this.productsForm.get('amount2').setValue(this.sum)
  }
  // clearArray(){
  //   this.itemArray.length = 0
  // }

  uploadFinal(){

    console.log("Real Sale", this.testForm2)
    this.productsForm.get('item_list').setValue(this.itemString)
    
    return this.items.postSaleOff(this.productsForm.value).subscribe();
  }
 async showAlert(msg) {
    let alert =await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler:()=>{

          }

        },
        {
          text: 'Ok',
          handler:()=>{
            this.uploadFinal();
          }
        }
      ]
    });
    await alert.present();
  }

}
