import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from '@store/index';
// import { AlertModule } from 'ngx-bootstrap';
// import { ProgressbarModule } from 'ngx-bootstrap';

import { AppErrorHandler } from './app-error-handler';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { BsNotifyComponent } from './components/bs-notify/bs-notify.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    // AlertModule,
    // ProgressbarModule
  ],
  declarations: [
    BsNavbarComponent,
    BsNotifyComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BsNavbarComponent,
    BsNotifyComponent
  ]
})
export class SharedModule { }

export function appErrorFactory(store: Store<IAppState>) {
  return new AppErrorHandler(store);
}

export const appErrorProvider = {
  provide: ErrorHandler,
  useClass: AppErrorHandler,
  deps: [ Store ],
  useFactory: appErrorFactory
};
