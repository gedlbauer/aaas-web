import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Metric } from '../types/metric.type';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  private metricNames: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {
    this.loadNames();
  }

  loadNames() {
    this.http.get<string[]>(`${environment.apiUrl}/api/metrics/names`).subscribe(x => this.metricNames.next(x));
  }

  getNames() {
    return this.metricNames;
  }

  getAll(metricName?: string, amount?: number): Observable<Metric[]> {
    let params: string[] = [];
    if (metricName) {
      params.push(`name=${metricName}`);
    }
    if (amount) {
      params.push(`amount=${amount}`);
    }

    const paramString = params.length > 0 ? `?${params.join('&')}` : '';

    return this.http.get<Metric[]>(`${environment.apiUrl}/api/metrics${paramString}`);
  }

}
