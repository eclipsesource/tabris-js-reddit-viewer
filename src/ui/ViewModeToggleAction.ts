import {Action, ChangeListeners, asFactory} from 'tabris';
import {event, prop} from 'tabris-decorators';
import {ViewMode} from '../common';

namespace internal {

  export class ViewModeToggleAction extends Action {

    @prop mode: ViewMode = ViewMode.List;
    @event readonly onModeChanged: ChangeListeners<this, 'mode'>;

    constructor() {
      super();
      this.onSelect(
        () => this.mode = this.mode === ViewMode.List ? ViewMode.Gallery : ViewMode.List
      );
      this.onModeChanged.values.subscribe(
        mode => this.title = mode === ViewMode.List ? 'Gallery' : 'List'
      );
    }
  }

}

export const ViewModeToggleAction = asFactory(internal.ViewModeToggleAction);
