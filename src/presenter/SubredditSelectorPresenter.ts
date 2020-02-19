import {inject, shared} from 'tabris-decorators';
import {SubredditSelectorView} from '../common';
import SubredditPresenter from './SubredditPresenter';
import Navigation from '../service/Navigation';

@shared export default class SubredditSelectorPresenter {

  constructor(
    @inject readonly view: SubredditSelectorView,
    @inject private readonly navigation: Navigation,
    @inject private readonly subredditPresenter: SubredditPresenter
  ) {
    view.onSelectionIndexChanged(() => this.updateSubreddit());
  }

  set subreddits(subreddits: string[]) {
    this.view.items = subreddits;
    this.updateSubreddit();
  }

  get subreddits() {
    return this.view.items;
  }

  private updateSubreddit() {
    this.navigation.navigateTo(this.subredditPresenter.view);
    this.subredditPresenter.subreddit = this.view.items[this.view.selectionIndex];
  }

}
