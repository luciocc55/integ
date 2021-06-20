import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { ThemingService } from './utility/theming.service';
import { NgxsModule, Store } from '@ngxs/store';
import { GlobalState } from './store/global/global.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { UpdateService } from './utility/updateVersion.service';
import { TranslocoRootModule } from './transloco/transloco-root.module';
import { GlobalesModule } from './components/globales/globales.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CuentasState } from './store/cuentas/cuentas.state';
import { TokenService } from './services/token.service';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { InterceptorHttp } from './utility/interceptors/http-interceptor';
import { TranslocoService } from '@ngneat/transloco';
import { MyCustomPaginatorIntl } from './utility/paginatorLang.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { HttpErrorInterceptor } from './utility/interceptors/error-interceptor';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    GlobalesModule,
    BrowserAnimationsModule,
    NgxsStoragePluginModule.forRoot({
      key: ['cuentas.token'],
    }),
    NgxsModule.forRoot([GlobalState, CuentasState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    TranslocoRootModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorHttp,
      multi: true,
      deps: [Store],
    },
    ThemingService,
    UpdateService,
    TokenService,
    {
      provide: MatPaginatorIntl,
      useClass: MyCustomPaginatorIntl,
      deps: [TranslocoService],
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'legacy' },
    },
    { provide: MAT_SNACK_BAR_DATA, useValue: {} },
    { provide: MatSnackBarRef, useValue: {} },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
      deps: [Store],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
