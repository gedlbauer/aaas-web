import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { DetectorListComponent } from './components/detector-list/detector-list.component';
import { LoginComponent } from './components/login/login.component';
import { NgMaterialModule } from './modules/ng-material/ng-material.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ActionListComponent } from './components/action-list/action-list.component';
import { ApiKeyInterceptor } from './http-interceptors/api-key.interceptor';
import { FormatMillisecondsPipe } from './pipes/format-milliseconds.pipe';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
import { DetectorDetailsComponent } from './components/detector-details/detector-details.component';
import { ActionDetailsComponent } from './components/action-details/action-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogsComponent } from './components/logs/logs.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartComponent } from './components/chart/chart.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    AppComponent,
    DetectorListComponent,
    LoginComponent,
    ActionListComponent,
    FormatMillisecondsPipe,
    ClickStopPropagationDirective,
    DetectorDetailsComponent,
    ActionDetailsComponent,
    LogsComponent,
    DashboardComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgMaterialModule,
    OAuthModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
