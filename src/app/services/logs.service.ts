import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap, withLatestFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Log } from '../types/log.type';
import { LogType } from '../types/logType.type';


@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http: HttpClient) {
    this.loadLogTypes();
  }

  private logTypes: BehaviorSubject<LogType[]> = new BehaviorSubject<LogType[]>([]);

  getFiltered(logName?: string): Observable<Log[]> {
    const filter = logName && logName.trim().length !== 0 ? `?name=${logName}` : '';
    return this.http.get<Log[]>(`${environment.apiUrl}/api/logs${filter}`).pipe(
      withLatestFrom(this.logTypes),
      map(tuple => tuple[0].map(log => { return { ...log, typeName: tuple[1].find(x => x.id === log.typeId)?.name ?? 'Other' } })),
    );
  }

  private loadLogTypes(): void {
    this.http.get<LogType[]>(`${environment.apiUrl}/api/logs/types`)
      .subscribe(x => this.logTypes.next(x));
  }

  getLogTypes(): Observable<LogType[]> {
    return this.logTypes;
  }
}
