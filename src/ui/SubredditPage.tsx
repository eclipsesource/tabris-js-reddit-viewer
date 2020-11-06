import {Page} from 'tabris';
import {component, injectable, inject, ListView, bindAll} from 'tabris-decorators';
import RedditGalleryCell from './RedditGalleryCell';
import RedditListCell from './RedditListCell';
import {SubredditViewModel} from '../viewModel/SubredditViewModel';
import {NavPoint} from '../common';

@injectable({param: NavPoint.Subreddit, shared: true})
@component
export class SubredditPage extends Page {

  @inject
  @bindAll({
    lastVisibleIndex: '<< ListView.lastVisibleIndex',
    posts: '>> ListView.items',
    columns: '>> ListView.columnCount',
    loading: '>> ListView.refreshIndicator',
    title: '>> :host.title'
  })
  readonly viewModel: SubredditViewModel;

  constructor() {
    super({autoDispose: false});
    this.append(
      <ListView stretch background='#f5f5f5' onSelect={this.viewModel.select}>
        <RedditListCell selectable
            height={96}
            itemCheck={() => this.viewModel.columns === 1}/>
        <RedditGalleryCell selectable
            height={160}
            itemCheck={() => this.viewModel.columns !== 1}/>
      </ListView>
    );
  }

}
