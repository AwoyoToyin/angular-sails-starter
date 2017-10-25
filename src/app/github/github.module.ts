import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { FollowersComponent } from './components/followers/followers.component';
import { githubRouter } from './github.router';
import { FollowersService } from './services/followers.service';

@NgModule({
  imports: [
    SharedModule,
    githubRouter
  ],
  declarations: [
    FollowersComponent
  ],
  providers: [
    FollowersService
  ]
})
export class GithubModule { }
