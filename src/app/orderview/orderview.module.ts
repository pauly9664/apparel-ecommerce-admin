import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderviewPageRoutingModule } from './orderview-routing.module';

import { OrderviewPage } from './orderview.page';
import { RouterModule, Routes } from '@angular/router';
// const routes: Routes = [
//   {
//     path: '',
//     component: OrderviewPage
//   }
// ];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderviewPageRoutingModule,
    // RouterModule.forChild(routes)
  ],
  declarations: [OrderviewPage]
})
export class OrderviewPageModule {}
