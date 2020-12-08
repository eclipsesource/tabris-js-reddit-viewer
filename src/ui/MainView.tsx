import {ChangeListeners, Composite, NavigationView, Page} from 'tabris';
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

  @event onPageChanged: ChangeListeners<MainView, 'page'>;

  private navigationView: NavigationView = (
    <NavigationView stretch drawerActionVisible>
      <ViewModeToggleAction/>
    </NavigationView>
  );

  constructor(
    @inject(NavPoint.Subreddit) rootPage: Page
  ) {
    super({layoutData: 'stretch'});
    this.navigationView
      .append(rootPage)
      .onRemoveChild(this.triggerPageChanged)
      .onAddChild(this.triggerPageChanged);
    this.append(this.navigationView);
  }

  set page(page: Page) {
    this.navigationView.pages().slice(1).detach();
    this.navigationView.append(page);
  }

  get page() {
    return this.navigationView.pages().last();
  }

  private triggerPageChanged = () => {
    this.onPageChanged.trigger({value: this.page});
  };

}
