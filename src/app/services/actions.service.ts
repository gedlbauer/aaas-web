import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  getAll(): Observable<Action[]> {
    return this.actions;
  }
}
