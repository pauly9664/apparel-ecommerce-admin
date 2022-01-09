import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewSalePage } from './view-sale.page';

const routes: Routes = [
  {
    path: '',
    component: ViewSalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewSalePageRoutingModule {}
