import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption, ECharts } from 'echarts';
import { map } from 'rxjs';
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

  }

  chartOption: any = {
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

    this.metricsService.getAll(this.metricName, 20).pipe(map(x => x.map(y => y.value))).subscribe(x => {
      if (this.chartOption.series) {
        this.chartOption.series[0].data = x;
      }
      chart.setOption(this.chartOption);
      // TODO: anzeigebug (immer nur letzte 7 werden angezeigt)
      // TODO: xaxis formatieren (behebt wahrscheinlich anzeigebug)
      // TODO: andere Chart typen
    });
  }

}
