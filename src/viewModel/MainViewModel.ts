import {ChangeListeners, Page} from 'tabris';
import {injectable, prop, resolve, event} from 'tabris-decorators';
import {GoToView} from '../actions';
import {NavPoint, ViewMode, ActionDispatcher} from '../common';
import {AppData} from '../service/AppData';

@injectable
export class MainViewModel extends ActionDispatcher {

  @event onPageChanged: ChangeListeners<MainViewModel, 'page'>;
  @event onModeChanged: ChangeListeners<MainViewModel, 'mode'>;

  @prop page: Page;
  @prop mode: ViewMode = this.appData.mode;
  @prop modeAction: boolean = false;

  private reversePageMapping = new Map<Page, NavPoint>();

  constructor() {
    super();
    this.appData.subscribe(this.handleView);
    this.onPageChanged.values.subscribe(this.syncPage);
    // TODO: this.dispatch(ToggleViewMode);
    this.onModeChanged.values.subscribe(mode => this.appData.mode = mode);
  }

  private handleView = ({view}: AppData) => {
    const page = resolve(Page, view);
    if (this.page !== page) {
      this.reversePageMapping.set(page, view);
      this.page = page;
      this.modeAction = view === NavPoint.Subreddit;
    }
  };

  private syncPage = (page: Page) => {
    const view = this.reversePageMapping.get(page);
    if (this.appData.view !== view) {
      this.dispatch(GoToView, {view});
    }
  };

}
