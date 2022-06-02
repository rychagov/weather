import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IChartData} from "../interfaces";


@Injectable({
  providedIn: 'root'
})
export class ChartService {
  chartState: IChartData = {
    year: '',
    month: '',
    day: '',
    yearData: {},
  };
  chartStateSubject = new BehaviorSubject(this.chartState);

  constructor() {
  }

  public getChartState() {
    return this.chartStateSubject;
  }

  public setChartState(state: IChartData) {
    this.chartStateSubject.next(state);
  }
}
