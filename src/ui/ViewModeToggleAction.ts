import {Action, ChangeListeners, Properties} from 'tabris';
import {event, prop} from 'tabris-decorators';
import {ViewMode} from '../common';

export class ViewModeToggleAction extends Action {

  @prop mode: ViewMode;
  @event readonly onModeChanged: ChangeListeners<this, 'mode'>;

  constructor(properties: Properties<ViewModeToggleAction>) {
    super(properties);
    this.onSelect(this.handleSelect);
    this.onModeChanged(this.handleModeChanged);
    this.mode = ViewMode.List;
  }

  private handleSelect = () => {
    this.mode = this.mode === ViewMode.List ? ViewMode.Gallery : ViewMode.List;
  };

  private handleModeChanged = () => {
    this.title = this.mode === ViewMode.List ? 'Gallery' : 'List';
  };

}
