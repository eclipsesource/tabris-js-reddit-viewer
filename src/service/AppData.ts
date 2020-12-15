import {Observable} from 'tabris';
import {List, prop, shared} from 'tabris-decorators';
import {DEFAULT_REDDITS, NavPoint, RedditPost, Subreddit, ViewMode} from '../common';

@shared
export class AppData {

  @prop
  readonly reddits: List<Subreddit>
    = List.from(DEFAULT_REDDITS.map(name => new Subreddit(name)));

  @prop
  subreddit: Subreddit = this.reddits[0];

  @prop({nullable: true})
  post: RedditPost = null;

  @prop
  view: NavPoint = NavPoint.Subreddit;

  @prop
  mode: ViewMode = ViewMode.List;

  subscribe(cb: (appData: AppData) => any) {
    return this[Symbol.observable]().subscribe(cb);
  }

  [Symbol.observable](): Observable<this> {
    return Observable.mutations(this);
  }

}
