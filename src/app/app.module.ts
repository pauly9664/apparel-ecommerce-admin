import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ErrorHandler, NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { IonApp } from '@ionic/angular';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsService } from './products.service';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer,  FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { PreviewModalPageModule } from './preview-modal/preview-modal.module';
import { OrderviewPageModule } from './orderview/orderview.module';
import { ViewSalePageModule } from './view-sale/view-sale.module';
// import { UploadModalPageModule } from './upload-modal/upload-modal.module';
export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get('access_token');
    },
    whitelistedDomains: ['192.168.137.1:500', '192.168.100.11:8080','192.168.0.122:501','192.168.0.109:501','192.168.200.154:500','192.168.200.187:500', '192.168.200.135:5000','192.168.100.35:501','192.168.137.1:500', '192.168.0.118:500', '192.168.200.142:5000', '192.168.200.129:500', '192.168.100.35:5000','192.168.0.106:500', '192.168.8.118:500','192.168.200.140:500','192.168.100.11:500', '192.168.0.136:501']
  }
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule, 
    OrderviewPageModule,
    // UploadModalPageModule,
    PreviewModalPageModule,
    ViewSalePageModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
}
    })
  ],
  
  providers: [
    StatusBar,
    SplashScreen,
   // {provide: ErrorHandler},
    ProductsService,
    Camera,

    FileTransfer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}