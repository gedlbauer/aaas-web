import { Component, Input } from '@angular/core';
import { FabButtonIcon } from './fab-button-icon.type';
import { speedDialFabAnimations } from './speed-dial-fab.animations';

@Component({
  selector: 'aaas-speed-dial-fab',
  templateUrl: './speed-dial-fab.component.html',
  styleUrls: ['./speed-dial-fab.component.scss'],
  animations: speedDialFabAnimations
})
export class SpeedDialFabComponent {
  @Input() items: FabButtonIcon[] = [];
  buttons: FabButtonIcon[] = [];
  fabTogglerState = 'inactive';

  constructor() { }

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.items;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }
}