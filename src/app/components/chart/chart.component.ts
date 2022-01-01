import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption, ECharts } from 'echarts';
import { map } from 'rxjs';
import { MetricsService } from 'src/app/services/metrics.service';
import { ChartType, CHART_TYPES } from 'src/app/types/chartType.type';

@Component({
  selector: 'aaas-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() metricName: string = '';
  CHART_TYPES = CHART_TYPES;
  selectedChartType: ChartType = 'bar';
  chart?: ECharts;

  constructor(private metricsService: MetricsService) { }

  ngOnInit(): void {  }

  chartOption: any = {
    xAxis: {
      type: 'category',
      labels: {
        enabled: false
      },
      data: ['']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [0],
        type: 'line'
      }
    ]
  };

  updateChartType(): void {
    if (this.chartOption.series) {
      this.chartOption.series[0].type = this.selectedChartType;
      this.chart?.setOption(this.chartOption);
    }
  }

  onChartInit(chart: ECharts) {
    this.chart = chart;
    chart.showLoading();
    this.metricsService.getAll(this.metricName, 20).subscribe(x => {
      if (this.chartOption.series) {
        this.chartOption.xAxis.data = x.map(y => new Date(y.timestamp).toLocaleString());
        this.chartOption.series[0].data = x.map(y => y.value);
        this.chartOption.series[0].type = this.selectedChartType;
      }
      chart.setOption(this.chartOption);
      chart.hideLoading();
      // TODO: anzeigebug (immer nur letzte 7 werden angezeigt)
      // TODO: xaxis formatieren (behebt wahrscheinlich anzeigebug)
      // TODO: andere Chart typen
    });
  }

}
