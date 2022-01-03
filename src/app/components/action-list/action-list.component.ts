import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionsService } from 'src/app/services/actions.service';
import { Action } from 'src/app/types/action.type';
import { ACTION_TYPES } from 'src/app/types/actionType.type';
import { FabButtonIcon } from '../speed-dial-fab/fab-button-icon.type';

@Component({
  selector: 'aaas-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.scss']
})
export class ActionListComponent implements OnInit {

  displayedColumns: string[] = ['actionType', 'name', 'more'];
  addableActions: FabButtonIcon[] = ACTION_TYPES.map(x => {
    return {
      title: x,
      url: x
    };
  });
actions$ ?: Observable<Action[]>;
constructor(private actionsService: ActionsService) { }

ngOnInit(): void {
  this.actions$ = this.actionsService.getAll();
}

}
