import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Detector } from '../types/detector.type';

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
    return `${environment.apiUrl}/api/detector/${actionType.toLowerCase().replace('detector', '')}`;
  }

  private loadAll() {
    this.http.get<Detector[]>(`${environment.apiUrl}/api/detector`)
      .subscribe(result => this.detectors.next(result));
  }

  getAll(): Observable<Detector[]> {
    return this.detectors;
  }

  getById(id: number): Observable<Detector> {
    return this.http.get<Detector>(`${environment.apiUrl}/api/detector/${id}`);
  }

  save(detector: Detector): Observable<Detector> | undefined {
    const url = this.getUrl(detector);
    if (!url) return undefined;
    const detectorDto = { ...detector, actionId: detector.action?.id };
    return this.http.post<Detector>(url, detectorDto).pipe(tap(insertedDetector => {
      let detectors = this.detectors.getValue();
      detectors.push(insertedDetector)
      this.detectors.next(detectors);
    }));
  }

  update(detector: Detector): Observable<void> | undefined {
    const url = this.getUrl(detector);
    if (!url) return undefined;
    const detectorDto = { ...detector, actionId: detector.action?.id };
    return this.http.put<void>(url, detectorDto).pipe(tap(() => {
      let detectors = this.detectors.getValue();
      const idx = detectors.findIndex(x => x.id === detector.id);
      detectors[idx] = detector;
      this.detectors.next(detectors);
    }));
  }
}
