import {Composite, Listeners, ChangeListeners, Properties, TextView} from 'tabris';
import {component, injectable, prop, event, ListView, Cell} from 'tabris-decorators';
import * as common from '../common';

@component
@injectable({implements: common.SubredditSelectorView, shared: true})
export default class SubredditSelectorView
  extends Composite
  implements common.SubredditSelectorView
{

  @prop selectionIndex: number = 0;
  @prop items: string[] = [];
  @event readonly onSelect: Listeners<{target: SubredditSelectorView, index: number}>;
  @event readonly onSelectionIndexChanged:
    ChangeListeners<common.SelectionIndexChangeEventTarget, 'index'>;

  constructor(properties?: Properties<SubredditSelectorView>) {
    super(properties);
    this.onSelect(ev => this.selectionIndex = ev.index);
    this.append(
      <ListView
          id='listView'
          stretch
          bind-items='items'
          onSelect={({itemIndex: index}) => this.onSelect.trigger({index})}>
        <Cell
            height={64}
            selectable
            highlightOnTouch>
          <TextView
              left={16} top={0} right={0} bottom={1}
              bind-text='item'
              background='white'
              font='20px sans-serif'/>
          <Composite
              stretchX bottom={0} height={1}
              background='#dfdfdf'/>
        </Cell>
      </ListView>
    );
  }

}
