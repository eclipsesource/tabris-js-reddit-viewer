import {drawer} from 'tabris';
import {injectable} from 'tabris-decorators';
import {NavPoint } from '../common';
import {Action} from '../common/Action';

@injectable
export class GoToView extends Action {

  view: NavPoint;

  exec() {
    drawer.close();
    this.appData.view = this.view;
  }

}
