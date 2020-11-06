import {List, prop} from 'tabris-decorators';
import {assignToModel} from './util';

export class RedditPostData {

  @prop readonly id: string;
  @prop readonly url: string;
  @prop readonly thumbnail: string;
  @prop readonly title: string;
  // eslint-disable-next-line camelcase
  @prop readonly num_comments: number;
  @prop readonly author: string;

  constructor(data: any) {
    assignToModel(this, data);
  }

}

export class RedditPost {

  @prop readonly kind: string;
  @prop readonly data: RedditPostData;

  constructor(post: any) {
    this.kind = post.kind;
    this.data = new RedditPostData(post.data);
  }

}

export class Subreddit {

  readonly posts: List<RedditPost> = new List();

  constructor(readonly name: string) {}

  toString() {
    return this.name;
  }

}
