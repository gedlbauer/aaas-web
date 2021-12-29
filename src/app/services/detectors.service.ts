import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  private loadAll() {
    console.log("loadall");
    this.http.get<Detector[]>(`${environment.apiUrl}/api/detector`)
      .subscribe(result => this.detectors.next(result));
  }

  getAll(): Observable<Detector[]> {
    return this.detectors;
  }
}
