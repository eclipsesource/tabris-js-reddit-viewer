import {Page} from 'tabris';
import {component, injectable, inject, ListView, bindAll} from 'tabris-decorators';
import {RedditGalleryCell} from './RedditGalleryCell';
import {RedditListCell} from './RedditListCell';
import {SubredditViewModel} from '../viewModel/SubredditViewModel';
import {NavPoint, RedditPost} from '../common';

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
  readonly viewModel!: SubredditViewModel;

  private listView = ListView<RedditPost>({
    stretch: true,
    background: '#f5f5f5',
    onSelect: ev => this.viewModel.select(ev.item),
    cellHeight: () => this.viewModel.columns === 1 ? 96 : 160,
    cellType: () => this.viewModel.columns === 1 ? RedditListCell.name : RedditGalleryCell.name,
    createCell: type =>
      type === RedditListCell.name
        ? RedditListCell({onTap: ListView.select})
        : RedditGalleryCell({onTap: ListView.select})
  });

  constructor() {
    super({autoDispose: false});
    this.append(this.listView);
  }

}
