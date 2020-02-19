import {Action, Page, ChangeListeners, Properties} from 'tabris';
import {event, property} from 'tabris-decorators';
import {isList, ViewMode, ViewModeToggleView, ViewModeChangeEventTarget} from '../common';

export default class ViewModeToggleAction extends Action implements ViewModeToggleView {

  @property mode: ViewMode;
  @property page: Page;
  @event readonly onModeChanged: ChangeListeners<ViewModeChangeEventTarget, 'mode'>;

  constructor(properties: Properties<ViewModeToggleAction>) {
    super(properties);
    this.on({select: this.handleSelect});
    this.onModeChanged(this.handleModeChanged);
    this.mode = ViewMode.List;
    this.page.on({
      appear: () => this.attach(),
      disappear: () => this.detach()
    });
  }

  private handleSelect = () => {
    this.mode = this.mode === ViewMode.List ? ViewMode.Gallery : ViewMode.List;
  };

  private handleModeChanged = () => {
    // @ts-ignore
    // eslint-disable-next-line
    this.win_symbol = isList(this.mode) ? 'ViewAll' : 'List';
    this.title = isList(this.mode) ? 'Gallery' : 'List';
  };

  private attach() {
    this.page.parent().append(this);
  }

}
