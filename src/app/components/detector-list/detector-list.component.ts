import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DetectorsService } from 'src/app/services/detectors.service';
import { Detector } from 'src/app/types/detector.type';

@Component({
  selector: 'app-detector-list',
  templateUrl: './detector-list.component.html',
  styleUrls: ['./detector-list.component.scss']
})
export class DetectorListComponent implements OnInit {
  detectors$?: Observable<Detector[]>;
  detectors?: Detector[];
  displayedColumns: string[] = ['telemetryName', 'action', 'checkInterval', 'active', 'more'];

  constructor(private detectorsService: DetectorsService, private router: Router) { }

  ngOnInit(): void {
    this.detectorsService.getAll().subscribe(x => {
      console.log("sub raised");
      this.detectors = x
    });
  }
}
