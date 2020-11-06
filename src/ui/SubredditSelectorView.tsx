import {Composite, drawer, TextView} from 'tabris';
import {component, shared, ListView, Cell, bindAll, inject} from 'tabris-decorators';
import {SubredditSelectorViewModel} from '../viewModel/SubredditSelectorViewModel';

@shared @component
export class SubredditSelectorView extends Composite {

  @inject
  @bindAll({
    reddits: 'ListView.items'
  })
  readonly viewModel: SubredditSelectorViewModel;

  constructor() {
    super();
    this
      .appendTo(drawer.set({enabled: true}))
      .append(
        <ListView stretch onSelect={this.viewModel.select}>
          <Cell selectable
              height={64}
              highlightOnTouch>
            <TextView
                left={16} top={0} right={0} bottom={1}
                bind-text='item'
                background='white'
                font='20px sans-serif'/>
            <Composite stretchX
                bottom={0} height={1}
                background='#dfdfdf'/>
          </Cell>
        </ListView>
      );
  }

}
