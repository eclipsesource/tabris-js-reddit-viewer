import {shared} from 'tabris-decorators';
import {RedditPost} from '../common';
import {get} from 'lodash';

@shared export default class RedditService {

  retries: number = 3;

  async fetchItems(subreddit: string, count: number, lastItem?: RedditPost): Promise<RedditPost[]> {
    const url = this.createRequestUrl(subreddit, count, lastItem);
    let attempt = 0;
    let response: Response;
    while (!response && (attempt++ <= this.retries)) {
      try {
        response = await fetch(url);
      } catch (ex) {
        if (attempt < this.retries) {
          // eslint-disable-next-line no-console
          console.debug(ex.message, 'retry...');
        } else {
          throw ex;
        }
      }
    }
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
