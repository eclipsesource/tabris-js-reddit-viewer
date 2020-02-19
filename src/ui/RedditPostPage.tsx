import {Page, ImageView, WebView, Properties} from 'tabris';
import {property} from 'tabris-decorators';
import {RedditPost} from '../common';

export default class RedditPostPage extends Page {

  @property item: RedditPost;

  constructor(properties: Properties<RedditPostPage>) {
    super({background: 'black'});
    this.set(properties).append(
      this.item.data.url.endsWith('.jpg')
        ? <ImageView stretch image={this.item.data.url}/>
        : <WebView stretch url={this.item.data.url}/>
    );
  }

}
