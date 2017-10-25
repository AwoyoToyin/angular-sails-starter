import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { homeRouter } from './home.router';

@NgModule({
  imports: [
    SharedModule,
    homeRouter
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
