import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MetricsService } from 'src/app/services/metrics.service';

@Component({
  selector: 'aaas-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  metricNames$: Observable<string[]>;
  selectedMetrics: string[] = [];

  constructor(metricsService: MetricsService) {
    this.metricNames$ = metricsService.getNames();
  }

  ngOnInit(): void {
  }
}
