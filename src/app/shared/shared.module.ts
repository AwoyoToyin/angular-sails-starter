import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppErrorHandler } from './app-error-handler';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    BsNavbarComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BsNavbarComponent
  ]
})
export class SharedModule { }

export const appErrorProvider = {
  provide: ErrorHandler,
  useClass: AppErrorHandler
};
