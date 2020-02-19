import {Composite, ImageView} from 'tabris';
import {component, property} from 'tabris-decorators';
import {RedditPostData} from '../common';

@component export default class RedditGalleryCell extends Composite {

  @property item: RedditPostData;

  constructor() {
    super();
    this.append(
      <ImageView
          stretch
          bind-image='item.thumbnail'
          background='#e0e0e0'
          scaleMode='fill'/>
    );
  }

}
