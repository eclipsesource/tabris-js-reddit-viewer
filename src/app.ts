import './viewModel';
import './service';
import {resolve} from 'tabris-decorators';
import {contentView, drawer} from 'tabris';
import {MainView, SubredditSelectorView} from './ui';

resolve(MainView)
  .set({layoutData: 'stretch'})
  .appendTo(contentView);

resolve(SubredditSelectorView)
  .set({layoutData: 'stretch'})
  .appendTo(drawer);
drawer.enabled = true;
