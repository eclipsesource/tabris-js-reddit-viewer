import {injectable, prop, List} from 'tabris-decorators';
import {GoToSubreddit} from '../actions';
import {ActionDispatcher, Subreddit} from '../common';

@injectable
export class SubredditSelectorViewModel extends ActionDispatcher {

  @prop readonly reddits: List<Subreddit> = this.appData.reddits;

  select(subreddit: Subreddit) {
    this.dispatch(GoToSubreddit, {subreddit});
  };

}
