import {drawer} from 'tabris';
import {injectable, prop, List, inject} from 'tabris-decorators';
import {NavPoint, Subreddit} from '../common';
import {AppData} from '../service';

@injectable
export class SubredditSelectorViewModel {

  @prop readonly reddits: List<Subreddit> = this.appData.reddits;

  constructor(@inject private appData: AppData) {}

  select = ({item}: {item: Subreddit}) => {
    this.appData.view = NavPoint.Subreddit;
    this.appData.subreddit = item;
    drawer.close();
  };

}
