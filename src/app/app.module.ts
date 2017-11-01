import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FollowersService } from '@github/services/followers.service';
import { Store } from '@ngrx/store';
import { BaseService } from '@shared/services/base.service';
import { appErrorProvider, SharedModule } from '@shared/shared.module';
import { effects, instrumentation, store } from '@store/index';
// import { AlertModule } from 'ngx-bootstrap';
// import { ProgressbarModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { routing } from './app.router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    SharedModule,
    // AlertModule.forRoot(),
    // ProgressbarModule.forRoot(),
    routing,
    store,
    effects,
    instrumentation
  ],
  providers: [
    appErrorProvider,
    BaseService,
    FollowersService,
    Store
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
