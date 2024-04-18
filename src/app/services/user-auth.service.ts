import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

import { JwtToken, User } from '~/models';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  static AUTH_REDIRECT_KEY = 'auth_redirect_uri';
  static JWT_KEY = 'token';
  constructor(private router$: Router) {}

  user?: User;

  token?: JwtToken;

  signing() {
    this.router$.navigateByUrl('/auth');
  }

  prepareSigning(jwt: JwtToken): boolean {
    if (!jwt || !jwt.access_token) {
      return false;
    }

    try {
      var decoded = jwt_decode(jwt.access_token);

      this.token = Object.assign(jwt, decoded);

      // save to storage and cookie
      this.saveToken(this.token);
      // check redirect page
      const authUri = localStorage.getItem(UserAuthService.AUTH_REDIRECT_KEY);
      if (authUri) {
        location.assign(authUri);
      }
      this.router$.navigateByUrl('/app');
      return true;
    } catch (error) {
      return false;
    }
  }

  saveToken(token: JwtToken) {
    localStorage.setItem(UserAuthService.JWT_KEY, JSON.stringify(token));
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

  validateToken(jwt: JwtToken) {
    if (jwt) {
      return true;
    }
    return false;
  }
}
