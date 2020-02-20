import {ChangeListeners, Listeners} from 'tabris';
import {property} from 'tabris-decorators';

export const INITIAL_ITEM_COUNT = 25;
export const AUTO_FETCH_COUNT = 10;

export const DEFAULT_REDDITS = [
  'Pics',
  'PetPictures',
  'AdviceAnimals',
  'Art',
  'Memes'
];

export enum ViewMode { Gallery = 'gallery', List = 'list' }

export class RedditPostData {

  @property id: string;
  @property url: string;
  @property thumbnail: string;
  @property title: string;
  // eslint-disable-next-line camelcase
  @property num_comments: number;
  @property author: string;

  constructor(data: any) {
    Object.assign(this, data);
  }

}

export class RedditPost {

  @property kind: string;
  @property data: RedditPostData;

  constructor(post: any) {
    this.kind = post.kind;
    this.data = new RedditPostData(post.data);
  }

}

export interface SelectionIndexChangeEventTarget {
  index: number;
}

export abstract class SubredditSelectorView {
  public abstract items: string[];
  public abstract selectionIndex: number;
  public abstract onSelectionIndexChanged: ChangeListeners<SelectionIndexChangeEventTarget, 'index'>;
}

export interface ViewModeChangeEventTarget {
  mode: ViewMode;
}

export abstract class ViewModeToggleView {
  mode: ViewMode;
  onModeChanged: ChangeListeners<ViewModeChangeEventTarget, 'mode'>;
}

export abstract class SubredditView {
  title: string;
  mode: ViewMode;
  items: RedditPost[];
  readonly viewModeToggleView: ViewModeToggleView;
  readonly onItemsRequested: Listeners<{target: object}>;
  readonly onItemSelected: Listeners<{target: object, item: RedditPost}>;
  public abstract addItems(items: RedditPost[]): any;
  public abstract clear(): any;
}
