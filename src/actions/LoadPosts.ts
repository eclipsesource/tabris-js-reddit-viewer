import {AlertDialog} from 'tabris';
import {inject, injectable, prop} from 'tabris-decorators';
import {AsyncAction, RedditPost, Subreddit} from '../common';
import {Reddit} from '../service';

const IGNORE_THUMBS = Object.freeze(['default', 'self', 'nsfw']);

@injectable
export class LoadPosts extends AsyncAction {

  @prop subreddit: Subreddit;
  @prop count: number;
  @prop timeout: number = 4000;
  @prop maxAttempts: number = 3;

  private attempt: number = 0;

  @inject
  private reddit: Reddit;

  async exec() {
    const {name, posts} = this.subreddit;
    let items: RedditPost[] = null;
    try {
      while (!items && (this.attempt++ <= this.maxAttempts)) {
        try {
          items = await this.reddit.fetchItems({
            subredditName: name,
            count: this.count,
            timeout: this.timeout,
            lastItem: posts[posts.length - 1]
          });
        } catch (ex) {
          if (this.attempt < this.maxAttempts) {
            console.warn(ex.message + ', retry...');
            this.timeout = this.timeout * 2;
          } else {
            throw ex;
          }
        }
      }
      const newItems = items.filter(post => IGNORE_THUMBS.indexOf(post.data.thumbnail) === -1);
      posts.push(...newItems);
    } catch (ex) {
      AlertDialog.open('Bad connection, try again later...');
    }
  }

}
