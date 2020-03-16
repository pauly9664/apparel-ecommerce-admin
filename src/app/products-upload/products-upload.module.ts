import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsUploadPageRoutingModule } from './products-upload-routing.module';

import { ProductsUploadPage } from './products-upload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProductsUploadPageRoutingModule
  ],
  declarations: [ProductsUploadPage]
})
export class ProductsUploadPageModule {}
