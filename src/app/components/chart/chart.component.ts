import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption, ECharts } from 'echarts';
import { MetricsService } from 'src/app/services/metrics.service';

@Component({
  selector: 'aaas-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() metricName: string = '';

  constructor(private metricsService: MetricsService) { }

  ngOnInit(): void {
    let metrics = this.metricsService.getAll(this.metricName, 20).subscribe(x => console.log(x));
  }

  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  };

  onChartInit(chart: ECharts) {
    
  }

}
