import {NavigationView, Page, WidgetCollection, contentView, drawer, LayoutData} from 'tabris';
import {inject, shared} from 'tabris-decorators';
import SubredditSelectorView from '../ui/SubredditSelectorView';

@shared export default class Navigation {

  private navigationView: NavigationView = (
    <NavigationView stretch drawerActionVisible/>
  );

  constructor(
    @inject private readonly subredditSelectorView: SubredditSelectorView
  ) {
    this.navigationView.appendTo(contentView);
    this.subredditSelectorView.set(LayoutData.stretch);
    this.subredditSelectorView.appendTo(drawer);
    this.subredditSelectorView.onSelect(() => drawer.close());
    drawer.enabled = true;
  }

  navigateTo(target: object) {
    if (!(target instanceof Page)) {
      throw new Error('Unknown target');
    }
    const pageStack = this.navigationView.pages().toArray();
    const pageIndex = pageStack.indexOf(target);
    if (pageIndex !== -1) {
      new WidgetCollection(pageStack.slice(pageIndex + 1)).dispose();
    } else {
      this.navigationView.append(target);
    }
  }

}
