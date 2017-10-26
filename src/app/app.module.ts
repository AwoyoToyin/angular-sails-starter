import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BaseService } from '@shared/services/base.service';
import { appErrorProvider, SharedModule } from '@shared/shared.module';
import { effects, instrumentation, store } from '@store/index';

import { AppComponent } from './app.component';
import { routing } from './app.router';
import { FollowersService } from '@github/services/followers.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    routing,
    store,
    effects,
    instrumentation
  ],
  providers: [
    appErrorProvider,
    BaseService,
    FollowersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
