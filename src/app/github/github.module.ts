import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { FollowersComponent } from '@github/components/followers/followers.component';
import { githubRouter } from '@github/github.router';

@NgModule({
  imports: [
    SharedModule,
    githubRouter
  ],
  declarations: [
    FollowersComponent
  ],
  providers: []
})
export class GithubModule { }
