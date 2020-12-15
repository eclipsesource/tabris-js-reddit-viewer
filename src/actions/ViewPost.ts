import {injectable} from 'tabris-decorators';
import {NavPoint, RedditPost} from '../common';
import {Action} from '../common/Action';
import {GoToView} from './GoToView';

@injectable
export class ViewPost extends Action {

  post: RedditPost;

  async exec() {
    this.appData.post = this.post;
    await this.dispatch(GoToView, {view: NavPoint.Post});
  }

}
