import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Action } from '../types/action.type';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  private actions = new BehaviorSubject<Action[]>([]);

  constructor(private http: HttpClient) {
    this.loadAll();
  }

  private loadAll() {
    console.log("loadall");
    this.http.get<Action[]>(`${environment.apiUrl}/api/action`)
      .subscribe(result => this.actions.next(result));
  }

  private getUrl(action: Action): string | undefined {
    const actionType = action.typeName;
    if (!actionType) {
      return undefined;
    }
    return `${environment.apiUrl}/api/action/${actionType.toLowerCase().replace('action', '')}`;
  }

  getAll(): Observable<Action[]> {
    return this.actions;
  }

  getById(id: number): Observable<Action> {
    return this.http.get<Action>(`${environment.apiUrl}/api/action/${id}`);
  }

  save(action: Action): Observable<Action> | undefined {
    const url = this.getUrl(action);
    if (!url) return undefined;
    console.log("POST: " + url)
    return this.http.post<Action>(url, action).pipe(tap(insertedAction => {
      let actions = this.actions.getValue();
      actions.push(insertedAction);
      this.actions.next(actions);
    }));
  }

  update(action: Action): Observable<void> | undefined {
    const url = this.getUrl(action);
    if (!url) return undefined;
    console.log("PUT: " + url)
    return this.http.put<void>(url, action).pipe(tap(() => {
      let actions = this.actions.getValue();
      const idx = actions.findIndex(x => x.id === action.id);
      actions[idx] = action;
      this.actions.next(actions);
    }
    ));
  }

}
