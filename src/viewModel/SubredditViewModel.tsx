import {last} from 'lodash';
import {inject, injectable, List, prop, event} from 'tabris-decorators';
import {AUTO_FETCH_COUNT, INITIAL_ITEM_COUNT, NavPoint, RedditPost, Subreddit, ViewMode} from '../common';
import {AlertDialog, ChangeListeners} from 'tabris';
import {AppData, Reddit} from '../service';

const IGNORE_THUMBS = Object.freeze(['default', 'self', 'nsfw']);

@injectable
export class SubredditViewModel {

  @prop title: string = '';
  @prop posts: List<RedditPost> = new List();
  @prop loading: boolean = false;
  @prop lastVisibleIndex: number;
  @prop columns: number = 1;

  @event readonly onLastVisibleIndexChanged: ChangeListeners<this, 'lastVisibleIndex'>;

  @inject private readonly reddit: Reddit;
  @inject private appData: AppData;

  constructor() {
    this.appData.onSubredditChanged.values.subscribe(this.handleSubreddit);
    this.appData.onModeChanged.values.subscribe(this.handleMode);
    this.onLastVisibleIndexChanged(this.handleLastVisibleIndexChanged);
  }

  select = ({item}: {item: RedditPost}) => {
    this.appData.post = item;
    this.appData.view = NavPoint.Post;
  };

  private handleSubreddit = ({name, posts}: Subreddit) => {
    this.title = '/r/' + name;
    this.posts = posts;
    this.loading = false;
    if (posts.length < INITIAL_ITEM_COUNT) {
      this.loadItems(INITIAL_ITEM_COUNT)
        .catch((ex) => console.error(ex));
    }
  };

  private handleMode = (mode: ViewMode) => {
    this.columns = mode === ViewMode.Gallery ? 4 : 1;
  };

  private handleLastVisibleIndexChanged = async ({value}: {value: number}) => {
    if (this.posts.length - value < (20 / this.columns) && !this.loading) {
      await this.loadItems(AUTO_FETCH_COUNT);
    }
  };

  private async loadItems(count: number) {
    try {
      this.loading = true;
      const {name, posts} = this.appData.subreddit;
      const items = await this.reddit.fetchItems(name, count, last(this.posts));
      const newItems = items.filter(post => IGNORE_THUMBS.indexOf(post.data.thumbnail) === -1);
      posts.push(...newItems);
    } catch {
      AlertDialog.open('Bad connection, try again later...');
    } finally {
      this.loading = false;
    }
  }

}
