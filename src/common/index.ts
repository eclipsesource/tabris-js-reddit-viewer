import {ChangeListeners, Listeners} from 'tabris';

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

export const isList = (viewMode: string) => viewMode === ViewMode.List;

export interface RedditPost {
  kind: string;
  data: RedditPostData;
}

export interface RedditPostData {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  // eslint-disable-next-line camelcase
  num_comments: number;
  author: string;
}

export interface RedditJsonResponse {
  data: {
    children: RedditPost[]
  };
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
