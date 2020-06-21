import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
// import { JwtHelperService } from '@auth0/angular-jwt';

const TOKEN_KEY = 'access_token';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  authenticationState = new BehaviorSubject(false);
  user = null;
  helper:any;

  constructor(private storage: Storage, private plt: Platform, 
    // private hyelper: JwtHelperService
    ) { 
    this.plt.ready().then(() => {
      this.checkToken();
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
}
