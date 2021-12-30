import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DetectorsService } from 'src/app/services/detectors.service';
import { Detector } from 'src/app/types/detector.type';

@Component({
  selector: 'app-detector-list',
  templateUrl: './detector-list.component.html',
  styleUrls: ['./detector-list.component.scss']
})
export class DetectorListComponent implements OnInit {
  detectors$?: Observable<Detector[]>;
  displayedColumns: string[] = ['detectorType', 'telemetryName', 'action', 'checkInterval', 'active', 'more'];

  constructor(private detectorsService: DetectorsService, private router: Router) { }

  ngOnInit(): void {
    this.detectors$ = this.detectorsService.getAll();
  }

  updateDetector(detector: Detector): void {
    this.detectorsService.update(detector)?.subscribe(); // TODO: im Service implementieren
  }
}
