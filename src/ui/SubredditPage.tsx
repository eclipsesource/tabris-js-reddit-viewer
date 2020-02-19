import {CollectionView, Page, PropertyChangedEvent, Listeners, Properties} from 'tabris';
import {component, event, getById, injectable} from 'tabris-decorators';
import {isList, RedditPost, ViewMode} from '../common';
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

  private _items: RedditPost[] = [];
  private _mode: ViewMode;
  private loading: boolean;
  @getById private collectionView: CollectionView;

  constructor(properties?: Properties<SubredditPage>) {
    super(properties);
    this.append(
      <CollectionView id='collectionView'
          stretch
          background='#f5f5f5'
          cellType={() => this._mode}
          cellHeight={(_index, type) => isList(type) ? 96 : 160}
          createCell={(type: string) => this.createCell(type)}
          updateCell={(view, index) => (view as Cell).item = this._items[index].data}
          onLastVisibleIndexChanged={this.handleLastVisibleIndexChanged}/>
    );
  }

  set mode(mode: ViewMode) {
    if (this._mode !== mode) {
      this._mode = mode;
      this.collectionView.columnCount = isList(this.mode) ? 1 : 3;
      this.collectionView.load(this.items.length);
    }
  }

  get mode() {
    return this._mode;
  }

  get items() {
    return this._items.concat(); // safe copy
  }

  clear() {
    this._items = [];
    this.collectionView.itemCount = 0;
  }

  addItems(newItems: RedditPost[]) {
    this.loading = false;
    const insertionIndex = this._items.length;
    this._items = this._items.concat(newItems);
    this.collectionView.insert(insertionIndex, newItems.length);
    this.collectionView.refreshIndicator = false;
  }

  createCell(type: string) {
    const cell = isList(type) ? <RedditListCell/> : <RedditGalleryCell/>;
    cell.onTap(() => {
      const index = cell.parent(CollectionView).itemIndex(cell);
      this.onItemSelected.trigger({item: this._items[index]});
    });
    return cell;
  }

  private handleLastVisibleIndexChanged = ({value}: PropertyChangedEvent<CollectionView, number>) => {
    if (this._items.length - value < (20 / this.collectionView.columnCount) && !this.loading) {
      this.loading = true;
      this.onItemsRequested.trigger();
    }
  };

}

type Cell = RedditListCell | RedditGalleryCell;
