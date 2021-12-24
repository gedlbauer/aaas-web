import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private oauthService: OAuthService) { }

  login(): boolean {
    this.oauthService.initCodeFlow();
    return true;
  }

  isLoggedIn() {
    return this.oauthService.hasValidAccessToken() &&
      this.oauthService.hasValidIdToken();
  }

  logout(): void {
    this.oauthService.logOut();
  }
}
