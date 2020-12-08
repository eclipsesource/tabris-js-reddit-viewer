import {ChangeListeners, Composite, NavigationView, Page, Widget} from 'tabris';
import {component, shared, inject, bindAll, event} from 'tabris-decorators';
import {MainViewModel} from '../viewModel/MainViewModel';
import {ViewModeToggleAction} from './ViewModeToggleAction';
import {NavPoint} from '../common';

@shared @component
export class MainView extends Composite {

  @inject
  @bindAll({
    page: ':host.page',
    mode: 'ViewModeToggleAction.mode',
    modeAction: '>> ViewModeToggleAction.visible'
  })
  readonly viewModel!: MainViewModel;

  @event
  readonly onPageChanged: ChangeListeners<MainView, 'page'>;

  private readonly navigationView =
    NavigationView({
      layoutData: 'stretch',
      drawerActionVisible: true,
      onRemoveChild: ev => this.handleChild(ev.child),
      onAddChild: ev => this.handleChild(ev.child),
      children: [ViewModeToggleAction()]
    });

  constructor(
    @inject(NavPoint.Subreddit) rootPage: Page
  ) {
    super();
    this.navigationView.append(rootPage);
    this.append(this.navigationView);
  }

  set page(page: Page) {
    this.navigationView.pages().slice(1).dispose();
    this.navigationView.append(page);
  }

  get page() {
    return this.navigationView.pages().last();
  }

  private handleChild(child: Widget) {
    if (child instanceof Page) {
      this.onPageChanged.trigger({value: this.page});
    }
  };

}
