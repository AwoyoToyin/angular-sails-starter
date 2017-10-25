import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { BaseService } from './../../shared/services/base.service';

@Injectable()
export class FollowersService extends BaseService {

  protected BASE_PATH = 'https://api.github.com';

  /**
   * Only needed if extra dependencies not in parent is needed
   * @param http Http
   */
  // constructor(protected http: Http) {
  //   super(http);
  // }

  /**
   * Gets all followers of a particular github account owner
   */
  getFollowers(username: string): Observable<any> {
      this.API_PATH = `${this.BASE_PATH}/users/${username}/followers`;
      return this.read();
  }

}
