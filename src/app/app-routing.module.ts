import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  // {
  //   path: 'preview-modal',
  //   loadChildren: () => import('./preview-modal/preview-modal.module').then( m => m.PreviewModalPageModule)
  // },
  // {
  //   path: 'upload-modal',
  //   loadChildren: () => import('./upload-modal/upload-modal.module').then( m => m.UploadModalPageModule)
  // },
  {
    path: 'products-upload',
    loadChildren: () => import('./products-upload/products-upload.module').then( m => m.ProductsUploadPageModule)
  },
  {
    path: 'orderview/:id',
    loadChildren: () => import('./orderview/orderview.module').then( m => m.OrderviewPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'new-orders',
    loadChildren: () => import('./new-orders/new-orders.module').then( m => m.NewOrdersPageModule)
  },  {
    path: 'sales',
    loadChildren: () => import('./sales/sales.module').then( m => m.SalesPageModule)
  },
  {
    path: 'view-sale',
    loadChildren: () => import('./view-sale/view-sale.module').then( m => m.ViewSalePageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
