import {injectable, prop} from 'tabris-decorators';
import {ActionDispatcher} from '../common';

@injectable
export class RedditPostViewModel extends ActionDispatcher {

  @prop title: string;
  @prop url: string;

  constructor() {
    super();
    this.appData.subscribe(({post}) => {
      this.title = post.data.title;
      this.url = post.data.url;
    });
  }

}
