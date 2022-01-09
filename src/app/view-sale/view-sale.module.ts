import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSalePageRoutingModule } from './view-sale-routing.module';

import { ViewSalePage } from './view-sale.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewSalePageRoutingModule
  ],
  declarations: [ViewSalePage]
})
export class ViewSalePageModule {}
