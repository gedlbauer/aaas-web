import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Detector } from '../types/detector.type';
import { DetectorType } from '../types/detectorType.type';

@Injectable({
  providedIn: 'root'
})
export class DetectorsService {

  private detectors = new BehaviorSubject<Detector[]>([]);

  constructor(private http: HttpClient) {
    this.loadAll();
  }

  private getUrl(detector: Detector): string | undefined {
    const actionType = detector.typeName;
    if (!actionType) {
      return undefined;
    }
    return `${environment.apiUrl}/api/detector/${actionType.toLowerCase().replace('action', '')}`;
  }

  private loadAll() {
    console.log("loadall");
    this.http.get<Detector[]>(`${environment.apiUrl}/api/detector`)
      .subscribe(result => this.detectors.next(result));
  }

  getAll(): Observable<Detector[]> {
    return this.detectors;
  }

  save(detector: Detector): Observable<Detector> | undefined {
    console.log('POST: '+this.getUrl(detector));
    return undefined;
  }

  update(detector: Detector): Observable<void> | undefined {
    console.log('PUT: '+this.getUrl(detector));

    return undefined;
  }
}
