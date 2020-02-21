import {Composite, ImageView, TextView, Properties} from 'tabris';
import {component, Cell} from 'tabris-decorators';
import {RedditPost} from '../common';

@component export default class RedditListCell extends Cell<RedditPost> {

  itemType = RedditPost;

  constructor(properties: Properties<RedditListCell>) {
    super();
    this.set(properties).append(
      <Composite
          left={16} top={8} right={16} bottom={8}
          cornerRadius={2}
          elevation={2}
          background='white'>
        <ImageView
            id='thumbView'
            width={80} height={80}
            bind-image='item.data.thumbnail'
            background='#e0e0e0'
            scaleMode='fill'/>
        <TextView markupEnabled
            left='prev() 16' top={8} right={16}
            bind-text='item.data.title'
            textColor='#202020'
            font='medium 14px'
            maxLines={2}/>
        <TextView
            right={16} bottom={8}
            template-text='${item.data.num_comments} comments'
            alignment='right'
            textColor='#7CB342'
            font='12px'/>
        <TextView
            left='#thumbView 16' right='prev() 16' bottom={8}
            bind-text='item.data.author'
            textColor='#767676'
            font='12px'/>
      </Composite>
    );
  }

}
