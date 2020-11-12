import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewOrdersPageRoutingModule } from './new-orders-routing.module';

import { NewOrdersPage } from './new-orders.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: NewOrdersPage }])
  ],
  declarations: [NewOrdersPage]
})
export class NewOrdersPageModule {}
