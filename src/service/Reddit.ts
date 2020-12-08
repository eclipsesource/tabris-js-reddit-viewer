import {shared} from 'tabris-decorators';
import {RedditPost} from '../common';

@shared
export class Reddit {

  private readonly retries: number = 3;

  async fetchItems(subreddit: string, count: number, lastItem?: RedditPost): Promise<RedditPost[]> {
    const url = this.createRequestUrl(subreddit, count, lastItem);
    let attempt = 0;
    let response: Response;
    let timeout = 4000;
    while (!response && (attempt++ <= this.retries)) {
      try {
        response = await fetch(url, {timeout});
      } catch (ex) {
        if (attempt < this.retries) {
          // eslint-disable-next-line no-console
          console.debug(ex.message + ', retry...');
          timeout = timeout * 2;
        } else {
          throw ex;
        }
      }
    }
    const json = await response.json();
    const children: any[] = json.data.children;
    return children.map(post => new RedditPost(post));
  }

  private createRequestUrl(subreddit: string, count: number, lastItem?: RedditPost) {
    let url = `http://www.reddit.com/r/${subreddit}.json?limit=${count}`;
    if (lastItem) {
      url += `&after=${lastItem.kind}_${lastItem.data.id}`;
    }
    return url;
  }

}
