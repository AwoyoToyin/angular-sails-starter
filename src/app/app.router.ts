import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
    // { path: '', component: ListComponent },
    // { path: '**', pathMatch: 'full', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
