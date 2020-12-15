import {contentView, drawer} from "tabris";
import {inject, injectable} from "tabris-decorators";
import {MainView, SubredditSelectorView} from "../ui";
import {Action} from "../common/Action";

@injectable
export class Init extends Action {

  @inject
  private mainView!: MainView;

  @inject
  private subredditSelectorView!: SubredditSelectorView;

  async exec() {
    this.mainView
      .set({layoutData: 'stretch'})
      .appendTo(contentView);
    this.subredditSelectorView
      .set({layoutData: 'stretch'})
      .appendTo(drawer);
    drawer.enabled = true;
    // this.appData.subscribe(
    //   () => console.info('UI Update')
    // );
  }

}
