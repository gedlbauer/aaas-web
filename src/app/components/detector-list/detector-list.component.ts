import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { DetectorsService } from 'src/app/services/detectors.service';
import { Detector } from 'src/app/types/detector.type';
import { DETECTOR_TYPES } from 'src/app/types/detectorType.type';
import { FabButtonIcon } from '../speed-dial-fab/fab-button-icon.type';

@Component({
  selector: 'aaas-detector-list',
  templateUrl: './detector-list.component.html',
  styleUrls: ['./detector-list.component.scss']
})
export class DetectorListComponent implements OnInit {
  detectors$?: Observable<Detector[]>;
  displayedColumns: string[] = ['detectorType', 'telemetryName', 'action', 'checkInterval', 'active', 'more'];

  addableDetectors: FabButtonIcon[] = DETECTOR_TYPES.map(x => {
    return {
      title: x,
      url: x
    };
  });

  constructor(private detectorsService: DetectorsService, private router: Router, private translate: TranslateService) { }

  ngOnInit(): void {
    this.detectors$ = this.detectorsService.getAll();
  }

  updateDetector(detector: Detector): void {
    this.detectorsService.update(detector)?.subscribe();
  }
}
