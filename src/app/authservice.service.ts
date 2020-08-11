import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform, AlertController } from '@ionic/angular';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
export interface Categories{
  _id: string;
  description: string;
  created_at: Date;
}
const TOKEN_KEY = 'access_token';
@Injectable({
  providedIn: 'root'
})

export class AuthserviceService {
  authenticationState = new BehaviorSubject(false);
  user = null;
  url = environment.url;
  // helper:any;

  constructor(private alertController: AlertController,private http: HttpClient, private storage: Storage, private plt: Platform, 
    private helper: JwtHelperService
    ) { 
      this.helper = new JwtHelperService();
    this.plt.ready().then(() => {
      this.checkToken();
    });
    }
    login(credentials) {
      return this.http.post(`${this.url}/api/login`, credentials).pipe(
        tap(res => {
          this.storage.set(TOKEN_KEY, res['token']);
          this.user = this.helper.decodeToken(res['token']);
          this.authenticationState.next(true);
        }),
        catchError(e => {
          this.showAlert(e.error.msg);
          throw new Error(e);
        })
      );
    }
    logout() {
      this.storage.remove(TOKEN_KEY).then(() => {
        this.authenticationState.next(false);
      });
    }
  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);

        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    });
  }
  getCategories(): Observable<Categories>{
    return this.http.get<Categories>(this.url + '/api/fetchCategories').pipe(map((response:Categories)=> response)) ;
   }
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Network Error, Please try again after a few minutes',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
  getOrder
}
