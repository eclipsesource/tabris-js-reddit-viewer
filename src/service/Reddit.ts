import {shared} from 'tabris-decorators';
import {RedditPost} from '../common';

type FetchItemsArgs = {
  subredditName: string;
  count: number;
  timeout: number;
  lastItem?: RedditPost;
};

@shared
export class Reddit {

  async fetchItems(
    { subredditName: subreddit, count, timeout, lastItem }: FetchItemsArgs,
  ): Promise<RedditPost[]> {
    const url = this.createRequestUrl(subreddit, count, lastItem);
    const response = await fetch(url, {timeout});
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
