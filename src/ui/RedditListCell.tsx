import {Composite, ImageView, TextView} from 'tabris';
import {component, property} from 'tabris-decorators';
import {RedditPostData} from '../common';

@component export default class RedditListCell extends Composite {

  @property item: RedditPostData;

  constructor() {
    super();
    this.append(
      <Composite
          left={16} top={8} right={16} bottom={8}
          cornerRadius={2}
          elevation={2}
          background='white'>
        <ImageView
            id='thumbView'
            width={80} height={80}
            bind-image='item.thumbnail'
            background='#e0e0e0'
            scaleMode='fill'/>
        <TextView markupEnabled
            left='prev() 16' top={8} right={16}
            bind-text='item.title'
            textColor='#202020'
            font='medium 14px'
            maxLines={2}/>
        <TextView
            right={16} bottom={8}
            template-text='${item.num_comments} comments'
            alignment='right'
            textColor='#7CB342'
            font='12px'/>
        <TextView
            left='#thumbView 16' right='prev() 16' bottom={8}
            bind-text='item.author'
            textColor='#767676'
            font='12px'/>
      </Composite>
    );
  }

}
