import { Component, OnInit } from '@angular/core';
import {ChartService} from "../../services/chart.service";
import {IChartData, IRecord} from "../../interfaces";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  public chartOptions = {
    chartType: 'line',
    datasets: [] as any,
    labels: [] as Array<string>,
    colors: [],
    options: {
      responsive: true
    },
  };

  /*chartDatasets = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'День' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Ночь' }
  ];*/

  // chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  /*chartColors = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];*/

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.chartService.getChartState().subscribe((data:IChartData) => {
      this.draw(data);
    });
  }

  private draw(data: IChartData): void {
    this.reset();

    let datasets = [];

    if (data.day) {
      const dataForDay = data.yearData[data.month][data.day];
      this.chartOptions.labels = Object.keys(dataForDay);
      let dataset = {};
      let dataForDataset = [];

      for (let dateTime in dataForDay) {
        if (dataForDay.hasOwnProperty(dateTime)) {
          let dataForTime = dataForDay[dateTime];
          dataForDataset.push(this.getTemperature(dataForTime));
        }
      }
      dataset = {data: dataForDataset, label: 'Температура'};
      datasets.push(dataset);

    } else if (data.month) {
      const dataForMonth = data.yearData[data.month];
      this.chartOptions.labels = Object.keys(dataForMonth).sort((a, b) => {
        return parseInt(a, 10) - parseInt(b, 10);
      });

      for (let time of ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']) {
        let dataset = {};
        let dataForDataset = [];
        for (let day in dataForMonth) {
          if (dataForMonth.hasOwnProperty(day)) {
            let dataForTime = dataForMonth[day][time];
            dataForDataset.push(this.getTemperature(dataForTime));
          }
          dataset = {data: dataForDataset, label: time};
        }
        datasets.push(dataset);
      }

      console.log(datasets);
    }
    this.chartOptions.datasets = datasets;
  }

  private getTemperature(data: IRecord): number {
    if (data && data.temp !== undefined && data.temp.air != undefined) {
      return data.temp.air;
    }

    // if data is absent return big value
    return 100;
  }

  private reset() {
    this.chartOptions.datasets = [];
  }

  chartClicked(event: any) {
  }

  chartHovered(event: any) {
  }

}
