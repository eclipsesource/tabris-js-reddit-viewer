import {ChangeListeners, Composite, NavigationView, Page, WidgetCollection} from 'tabris';
import {component, shared, inject, bindAll, event} from 'tabris-decorators';
import {MainViewModel} from '../viewModel/MainViewModel';
import {ViewModeToggleAction} from './ViewModeToggleAction';

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

  constructor() {
    super({layoutData: 'stretch'});
    this.navigationView
      .onRemoveChild(this.triggerPageChanged)
      .onAddChild(this.triggerPageChanged);
    this.append(this.navigationView);
  }

  set page(page: Page) {
    if (page === this.page) {
      return;
    }
    const pageStack = this.navigationView.pages().toArray();
    const pageIndex = pageStack.indexOf(page);
    if (pageIndex !== -1) {
      new WidgetCollection(pageStack.slice(pageIndex + 1)).dispose();
    } else {
      this.navigationView.append(page);
    }
  }

  get page() {
    return this.navigationView.pages().last();
  }

  private triggerPageChanged = () => {
    this.onPageChanged.trigger({value: this.page});
  };

}
