import { GithubFollower } from './follower/follower.model';

export class Github {

    constructor(private follower?: GithubFollower[]) {
        // console.log('follower -- ', follower);
    }

    get followers() {
        return this.follower;
    }

    get totalFollowersCount() {
        return this.follower.length;
    }
}
