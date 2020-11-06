import {injectable, prop, inject} from 'tabris-decorators';
import {AppData} from '../service/AppData';

@injectable
export class RedditPostViewModel {

  @prop title: string;
  @prop url: string;

  constructor(@inject appData: AppData) {
    appData.onPostChanged.values.subscribe(({data}) => {
      this.title = data.title;
      this.url = data.url;
    });
  }

}
