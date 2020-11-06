import {Page, ImageView, WebView} from 'tabris';
import {component, injectable, inject, bindAll} from 'tabris-decorators';
import {NavPoint} from '../common';
import {RedditPostViewModel} from '../viewModel/RedditPostViewModel';

@injectable({param: NavPoint.Post, shared: true})
@component
export class RedditPostPage extends Page {

  @inject
  @bindAll({
    title: '>> :host.title',
    url: '>> :host.url'
  })
  readonly viewModel!: RedditPostViewModel;

  private imageView: ImageView = <ImageView stretch excludeFromLayout zoomEnabled/>;
  private webView: WebView = <WebView stretch excludeFromLayout/>;

  constructor() {
    super({background: 'black', autoDispose: false});
    this.append(this.imageView, this.webView);
  }

  set url(url: string) {
    const isImage = url.endsWith('.jpg');
    this.imageView.set({
      excludeFromLayout: !isImage,
      image: isImage ? url : null
    });
    this.webView.set({
      excludeFromLayout: isImage,
      url: isImage ? null : url
    });
  }

}
