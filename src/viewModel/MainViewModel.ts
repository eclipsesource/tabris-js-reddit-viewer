import {ChangeListeners, Page} from 'tabris';
import {injectable, prop, inject, resolve, event} from 'tabris-decorators';
import {NavPoint, ViewMode} from '../common';
import {AppData} from '../service/AppData';

@injectable
export class MainViewModel {

  @event onPageChanged: ChangeListeners<MainViewModel, 'page'>;
  @event onModeChanged: ChangeListeners<MainViewModel, 'mode'>;

  @prop page: Page;
  @prop mode: ViewMode = this.appData.mode;
  @prop modeAction: boolean = false;

  private reversePageMapping = new Map<Page, NavPoint>();

  constructor(
    @inject private appData: AppData
  ) {
    this.appData.onViewChanged.values.subscribe(this.handleView);
    this.onPageChanged.values.subscribe(this.syncPage);
    this.onModeChanged.values.subscribe(mode => this.appData.mode = mode);
  }

  private handleView = (view: NavPoint) => {
    const page = resolve(Page, view);
    this.reversePageMapping.set(page, view);
    this.page = page;
    this.modeAction = view === NavPoint.Subreddit;
  };

  private syncPage = (page: Page) => {
    if (this.reversePageMapping.has(page)) {
      this.appData.view = this.reversePageMapping.get(page);
    }
  };

}
