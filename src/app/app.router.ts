import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: 'app/home/home.module#HomeModule' },
    { path: 'github', loadChildren: 'app/github/github.module#GithubModule' },
    // { path: '**', pathMatch: 'full', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
