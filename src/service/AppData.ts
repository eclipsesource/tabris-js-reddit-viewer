import {ChangeListeners} from 'tabris';
import {List, prop, shared, event} from 'tabris-decorators';
import {DEFAULT_REDDITS, NavPoint, RedditPost, Subreddit, ViewMode} from '../common';

@shared
export class AppData {

  @event onSubredditChanged: ChangeListeners<AppData, 'subreddit'>;
  @event onPostChanged: ChangeListeners<AppData, 'post'>;
  @event onViewChanged: ChangeListeners<AppData, 'view'>;
  @event onModeChanged: ChangeListeners<AppData, 'mode'>;

  @prop readonly reddits: List<Subreddit>;
  @prop subreddit: Subreddit;
  @prop({nullable: true}) post: RedditPost = null;
  @prop view: NavPoint = NavPoint.Subreddit;
  @prop mode: ViewMode = ViewMode.List;

  constructor() {
    this.reddits = List.from(DEFAULT_REDDITS.map(name => new Subreddit(name)));
    this.subreddit = this.reddits[0];
  }

}
