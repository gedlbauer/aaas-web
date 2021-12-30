import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Log } from '../types/log.type';


@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http: HttpClient) {  }

  getFiltered(logName?: string): Observable<Log[]>{
    const filter = logName && logName.trim().length !== 0 ? `?name=${logName}` : '';
    return this.http.get<Log[]>(`${environment.apiUrl}/api/logs${filter}`).pipe(tap(console.log));
  }
}
