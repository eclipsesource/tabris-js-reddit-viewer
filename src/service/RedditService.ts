import {shared} from 'tabris-decorators';
import {RedditPost} from '../common';
import {get} from 'lodash';

@shared export default class RedditService {

  async fetchItems(subreddit: string, count: number, lastItem?: RedditPost): Promise<RedditPost[]> {
    const response = await fetch(this.createRequestUrl(subreddit, count, lastItem));
    const json = await response.json();
    const children = get(json, 'data.children', []);
    return children.map((post: any) => new RedditPost(post));
  }

  private createRequestUrl(subreddit: string, count: number, lastItem?: RedditPost) {
    let url = `http://www.reddit.com/r/${subreddit}.json?limit=${count}`;
    if (lastItem) {
      url += `&after=${lastItem.kind}_${lastItem.data.id}`;
    }
    return url;
  }

}
