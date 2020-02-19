import {CollectionView, Composite, Listeners, ChangeListeners, TextView, Properties} from 'tabris';
import {component, event, getById, injectable, property} from 'tabris-decorators';
import * as common from '../common';

@component
@injectable({implements: common.SubredditSelectorView, shared: true})
export default class SubredditSelectorView
  extends Composite
  implements common.SubredditSelectorView
{

  @property selectionIndex: number = 0;
  @event readonly onSelect: Listeners<{target: SubredditSelectorView, index: number}>;
  @event readonly onSelectionIndexChanged:
    ChangeListeners<common.SelectionIndexChangeEventTarget, 'index'>;

  private _items: string[] = [];
  @getById private collectionView: CollectionView;

  constructor(properties?: Properties<SubredditSelectorView>) {
    super(properties);
    this.onSelect(ev => this.selectionIndex = ev.index);
    this.append(
      <CollectionView id='collectionView'
          stretch
          cellHeight={64}
          createCell={() => this.createCell()}
          updateCell={(view, index) => (view as TextCell).text = this._items[index]}/>
    );
  }

  set items(items: string[]) {
    this._items = items.concat();
    this.collectionView.load(this._items.length);
  }

  get items() {
    return this._items.concat();
  }

  createCell() {
    const cell = new TextCell();
    cell.onTap(() => {
      const index = cell.parent(CollectionView).itemIndex(cell);
      this.onSelect.trigger({index});
    });
    return cell;
  }

}

@component class TextCell extends Composite {

  @property text: string;

  constructor() {
    super({highlightOnTouch: true});
    this.append(
      <$>
        <TextView
            left={16} top={0} right={0} bottom={1}
            bind-text='text'
            background='white'
            font='20px sans-serif'/>
        <Composite left={0} right={0} bottom={0} height={1} background='#dfdfdf'/>
      </$>
    );
  }

}
