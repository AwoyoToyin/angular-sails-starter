import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routing } from './app.router';
import { BaseService } from './shared/services/base.service';
import { appErrorProvider, SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    routing
  ],
  providers: [
    appErrorProvider,
    BaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
