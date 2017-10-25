import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BaseService } from './shared/services/base.service';
import { AppErrorHandler } from './shared/app-error-handler';
import { routing } from './app.router';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    BaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
