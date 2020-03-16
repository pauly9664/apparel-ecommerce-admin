import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsUploadPage } from './products-upload.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsUploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsUploadPageRoutingModule {}
