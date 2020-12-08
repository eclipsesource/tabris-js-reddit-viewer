import {Composite, ImageView, TextView, Attributes, Setter, Color, LayoutData} from 'tabris';
import {Cell} from 'tabris-decorators';
import {RedditPost} from '../common';

export const RedditListCell = (attr: Attributes<Cell<RedditPost>>) =>
  Cell<RedditPost>({
    ...attr,
    itemType: RedditPost,
    apply: ({item}) => [
      Setter(ImageView, {image: item?.data.thumbnail}),
      Setter(TextView, '#title', {text: item?.data.title}),
      Setter(TextView, '#comments', {text: `${item?.data.num_comments} comments`}),
      Setter(TextView, '#author', {text: item?.data.author})
    ],
    children: [
      Composite({
        layoutData: {left: 16, top: 8, right: 16, bottom: 8},
        cornerRadius: 2,
        elevation: 2,
        background: Color.white,
        children: [
          ImageView({
            width: 80, height: 80,
            background: '#e0e0e0',
            scaleMode: 'fill'
          }),
          TextView({
            id: 'title',
            layoutData: {left: [LayoutData.prev, 16], top: 8, right: 16},
            markupEnabled: true,
            textColor: '#202020',
            font: 'medium 14px',
            maxLines: 2
          }),
          TextView({
            id: 'comments',
            right: 16, bottom: 8,
            alignment: 'right',
            textColor: '#7CB342',
            font: '12px'
          }),
          TextView({
            id: 'author',
            left: 'ImageView 16', right: 'prev() 16', bottom: 8,
            textColor: '#767676',
            font: '12px'
          })
        ]
      })
    ]
  });
