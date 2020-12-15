import {Composite, Color, TextView, Font, Setter} from 'tabris';
import {component, shared, ListView, Cell, bindAll, inject,} from 'tabris-decorators';
import {SubredditSelectorViewModel} from '../viewModel/SubredditSelectorViewModel';
import {Subreddit} from '../common';

@shared @component
export class SubredditSelectorView extends Composite {

  @inject
  @bindAll({
    reddits: 'ListView.items'
  })
  readonly viewModel: SubredditSelectorViewModel;

  private ui = ListView<Subreddit>({
    layoutData: 'stretch',
    onSelect: ev => this.viewModel.select(ev.item),
    cellHeight: 64,
    createCell: () =>
      Cell({
        itemType: Subreddit,
        onTap: ListView.select,
        highlightOnTouch: true,
        apply: ({item}) => Setter(TextView, {
          text: item?.name
        }),
        children: [
          TextView({
            layoutData: {left: 16, top: 0, right: 0, bottom: 1},
            background: Color.white,
            font: {size: 20, family: [Font.sansSerif]}
          }),
          Composite({
            stretchX: true,
            bottom: 0,
            height: 1,
            background: '#dfdfdf'
          })
        ]
      })
  });

  constructor() {
    super();
    this.append(this.ui);
  }

}
