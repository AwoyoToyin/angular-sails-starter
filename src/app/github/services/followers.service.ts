import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GithubFollower } from '@github/models/follower/follower.model';
import { Github } from '@github/models/github.model';
import { AppError } from '@shared/errors/app-error';
import { BaseService } from '@shared/services/base.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FollowersService extends BaseService {

  protected BASE_PATH = 'https://api.github.com';

  /**
   * Only needed if extra dependencies not in parent is needed
   * @param http Http
   */
  constructor(protected http: Http) {
    super(http);
  }

  /**
   * Gets all followers of a particular github account owner
   */
  getFollowers(username: string): Observable<Github | any> {
      this.API_PATH = `${this.BASE_PATH}/users/${username}/followers`;
      return this.http.get(this.API_PATH)
        .map(res => {
          const data: GithubFollower[] = res.json();
          return new Github(data);
        })
        .catch(this.handleError);
  }

}
