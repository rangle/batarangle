import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  NgZone,
  Input,
  Output,
} from '@angular/core';

import {UserActions} from '../../actions/user-actions/user-actions';
import {UserActionType} from '../../actions/action-constants';
import {StateTab, Theme} from '../../state';
import {TabMenu} from '../tab-menu/tab-menu';
import {ComponentInfo} from '../component-info/component-info';
import {InjectorTree} from '../injector-tree/injector-tree';
import {Node} from '../../../tree';

@Component({
  selector: 'bt-info-panel',
  template: require('./info-panel.html'),
  directives: [
    ComponentInfo,
    InjectorTree,
    TabMenu,
  ]
})
export class InfoPanel {
  @Input() tree;
  @Input() node;
  @Input() state;
  @Input() theme: Theme;

  @Output() private selectionChange = new EventEmitter<Node>();

  private StateTab = StateTab;

  private selectedTab = StateTab.Properties;

  private tabs = [{
      title: 'Properties',
      selected: false,
      tab: StateTab.Properties,
    }, {
      title: 'Injector Graph',
      selected: false,
      tab: StateTab.InjectorGraph,
    }];

  constructor(private userActions: UserActions) {}

  private onSelectedTabChanged(tab: StateTab) {
    this.selectedTab = tab;
  }

  private onSelectionChange(node: Node) {
    this.selectionChange.emit(node);
  }
}
