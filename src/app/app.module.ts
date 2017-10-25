import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routing } from './app.router';
import { AppErrorHandler } from './shared/app-error-handler';
import { BaseService } from './shared/services/base.service';

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
