import {ImageView, Properties} from 'tabris';
import {component, Cell} from 'tabris-decorators';
import {RedditPost} from '../common';

@component export default class RedditGalleryCell extends Cell<RedditPost> {

  itemType = RedditPost;

  constructor(properties: Properties<RedditGalleryCell>) {
    super();
    this.set(properties).append(
      <ImageView
          stretch
          bind-image='item.data.thumbnail'
          background='#e0e0e0'
          scaleMode='fill'/>
    );
  }

}
