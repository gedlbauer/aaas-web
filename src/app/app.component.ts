import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { AuthenticationService } from './services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Analytics as a Service';
  showFiller = false;

  constructor(private oauthService: OAuthService, translate: TranslateService, public auth: AuthenticationService) {
    this.configureWithNewConfigApi();
    translate.addLangs(['de', 'en']);
    translate.use(translate.getBrowserLang() ?? translate.getDefaultLang());
  }

  logout(){
    this.oauthService.logOut();
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
