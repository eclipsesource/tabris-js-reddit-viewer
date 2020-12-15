import {injectable, List, prop, event} from 'tabris-decorators';
import {ActionDispatcher, AUTO_FETCH_COUNT, INITIAL_ITEM_COUNT, RedditPost, Subreddit, ViewMode} from '../common';
import {ChangeListeners} from 'tabris';
import {LoadPosts, ViewPost } from '../actions';

@injectable
export class SubredditViewModel extends ActionDispatcher {

  @prop title: string = '';
  @prop posts: List<RedditPost> = new List();
  @prop loading: boolean = false;
  @prop lastVisibleIndex: number;
  @prop columns: number = 1;
  @prop subreddit: Subreddit;

  @event readonly onLastVisibleIndexChanged: ChangeListeners<this, 'lastVisibleIndex'>;

  constructor() {
    super();
    this.appData.subscribe(({subreddit}) => this.handleSubreddit(subreddit));
    this.appData.subscribe(({mode}) => this.handleMode(mode));
    this.onLastVisibleIndexChanged(ev => this.handleLastVisibleIndexChanged(ev.value));
  }

  select(item: RedditPost) {
    this.dispatch(ViewPost, {post: item});
  };

  private handleSubreddit(subreddit: Subreddit) {
    if (this.subreddit !== subreddit) {
      this.subreddit = subreddit;
      this.title = '/r/' + subreddit.name;
      this.posts = subreddit.posts;
      this.loading = false;
      if (this.posts.length < INITIAL_ITEM_COUNT) {
        this.loadItems(subreddit, INITIAL_ITEM_COUNT);
      }
    }
  };

  private handleMode(mode: ViewMode) {
    this.columns = mode === ViewMode.Gallery ? 4 : 1;
  };

  private async handleLastVisibleIndexChanged(index: number) {
    if (this.posts.length - index < (20 / this.columns) && !this.loading) {
      await this.loadItems(this.subreddit, AUTO_FETCH_COUNT);
    }
  };

  private async loadItems(subreddit: Subreddit, count: number) {
    this.loading = true;
    await this.dispatchAsync(LoadPosts, {subreddit, count});
    this.loading = false;
  }

}
