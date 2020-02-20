import {Page, Listeners, Properties} from 'tabris';
import {component, injectable, event, getById, ListView, List, property} from 'tabris-decorators';
import {RedditPost, ViewMode} from '../common';
import ViewModeToggleAction from './ViewModeToggleAction';
import RedditGalleryCell from './RedditGalleryCell';
import RedditListCell from './RedditListCell';
import * as common from '../common';

@component
@injectable({implements: common.SubredditView})
export default class SubredditPage extends Page implements common.SubredditView {

  @event readonly onItemSelected: Listeners<{target: SubredditPage, item: RedditPost}>;
  @event readonly onItemsRequested: Listeners<{target: SubredditPage}>;
  readonly viewModeToggleView: ViewModeToggleAction = (
    <ViewModeToggleAction page={this}/>
  );

  private _mode: ViewMode;
  private loading: boolean;
  @property private _items: List<RedditPost> = new List();
  @getById private listView: ListView<RedditPost>;

  constructor(properties?: Properties<SubredditPage>) {
    super(properties);
    this.append(
      <ListView
          id='listView'
          stretch
          background='#f5f5f5'
          bind-items='_items'
          onLastVisibleIndexChanged={this.handleLastVisibleIndexChanged}
          onSelect={({item}) => this.onItemSelected.trigger({item: item as RedditPost})}>
        <RedditListCell
            height={96}
            selectable
            itemCheck={() => this.mode === ViewMode.List}/>
        <RedditGalleryCell
            height={160}
            selectable
            itemCheck={() => this.mode !== ViewMode.List}/>
      </ListView>
    );
  }

  set mode(mode: ViewMode) {
    if (this._mode !== mode) {
      this._mode = mode;
      this.listView.columnCount = this.mode === ViewMode.List ? 1 : 3;
    }
  }

  get mode() {
    return this._mode;
  }

  get items() {
    return Array.from(this._items);
  }

  clear() {
    this._items = new List();
  }

  addItems(newItems: RedditPost[]) {
    this.loading = false;
    this._items.push(...newItems);
    this.listView.refreshIndicator = false;
  }

  private handleLastVisibleIndexChanged = ({value}: {value: number}) => {
    if (this._items.length - value < (20 / this.listView.columnCount) && !this.loading) {
      this.loading = true;
      this.onItemsRequested.trigger();
    }
  };

}
