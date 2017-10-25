import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FollowersComponent } from './components/followers/followers.component';

const routes: Routes = [
    { path: '', redirectTo: 'followers', pathMatch: 'full' },
    { path: 'followers', component: FollowersComponent }
];

export const githubRouter: ModuleWithProviders = RouterModule.forChild(routes);
