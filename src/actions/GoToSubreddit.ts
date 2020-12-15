import {injectable} from 'tabris-decorators';
import {NavPoint, Subreddit} from '../common';
import {Action} from '../common/Action';
import { GoToView } from './GoToView';

@injectable
export class GoToSubreddit extends Action {

  subreddit: Subreddit;

  exec() {
    this.dispatch(GoToView, {view: NavPoint.Subreddit});
    this.appData.subreddit = this.subreddit;
  }

}
