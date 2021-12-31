import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionsService } from 'src/app/services/actions.service';
import { Action } from 'src/app/types/action.type';

@Component({
  selector: 'aaas-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.scss']
})
export class ActionListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'more'];
  actions$?: Observable<Action[]>;
  constructor(private actionsService: ActionsService) { }

  ngOnInit(): void {
    this.actions$ = this.actionsService.getAll();
  }

}
