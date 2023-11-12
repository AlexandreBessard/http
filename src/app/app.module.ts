import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {AuthInterceptorService} from "./auth-interceptor.service";
import {LoggingInterceptorService} from "./logging-interceptor.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  // for all requests leaving the app, runs their intercept method
  providers: [
    // the order does matter, their execution is based on their order
    {
      // run first
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true},
    {
      // second
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
