import {ImageView, Setter, Attributes} from 'tabris';
import {Cell} from 'tabris-decorators';
import {RedditPost} from '../common';

export const RedditGalleryCell = (attr: Attributes<Cell<RedditPost>>) =>
  Cell<RedditPost>({
    ...attr,
    itemType: RedditPost,
    apply: ({item}) => [
      Setter(ImageView, {image: item?.data.thumbnail}),
    ],
    children: [
      ImageView({
        stretch: true,
        background: '#e0e0e0',
        scaleMode: 'fill'
      })
    ]
  });
