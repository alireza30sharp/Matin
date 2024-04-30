import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtToken, User } from '@models';
import jwt_decode from 'jwt-decode';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  static AUTH_REDIRECT_KEY = 'auth_redirect_uri';
  static JWT_KEY = 'token';
  constructor(private router$: Router) {}
  private userSource = new ReplaySubject<JwtToken | null>(1);
  user$ = this.userSource.asObservable();

  user?: User;

  token?: any;

  signing() {
    this.router$.navigateByUrl('/auth');
  }

  prepareSigning(jwt: string): boolean {
    if (!jwt) {
      return false;
    }

    try {
      this.token=jwt
      var decoded = jwt_decode(jwt);
     let jwtDecoded = Object.assign(jwt, decoded);
      // save to storage and cookie
      this.saveToken(jwtDecoded as any);
      // check redirect page
      const authUri = localStorage.getItem(UserAuthService.AUTH_REDIRECT_KEY);
      if (authUri) {
        location.assign(authUri);
      }
      this.router$.navigateByUrl('/company');
      return true;
    } catch (error) {
      return false;
    }
  }

  saveToken(token: JwtToken) {
    this.setUser(token)
    localStorage.setItem(UserAuthService.JWT_KEY, JSON.stringify(token));
  }
  setUser(user: JwtToken) {
    this.userSource.next(user);
  }
  restoreToken(): JwtToken | undefined {
    var token = localStorage.getItem(UserAuthService.JWT_KEY);

    if (token && token.length > 10) {
      try {
        const t = JSON.parse(token);
      
        if (this.validateToken(t)) {
          return t;
        }
      } catch {}
    }
    return undefined;
  }

  validateToken(jwt: string) {
    if (jwt) {
    let decoded=  jwt_decode(jwt);
      const t =Object.assign(jwt, decoded);;
      this.setUser(t as any)
      return true;
    }
    return false;
  }
}
