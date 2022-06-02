import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {DataService} from "../../../services/data.service";
import {ChartService} from "../../services/chart.service";
import {IResponse} from "../../interfaces";
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() currentSettings: any;
  @Output() togglePosition = new EventEmitter();

  private weatherData = {} as IResponse;
  public years: Array<String> = [];

  public calendar = {
    years: [] as Array<String>,
    months: [] as Array<String>,
    days: [] as Array<String>,
  };

  public currentYear = '';

  filterForm = new FormGroup({
    year: new FormControl(''),
    month: new FormControl(''),
    day: new FormControl('',),
  });

  constructor(private dataService: DataService, private chartService: ChartService) {
  }

  ngOnInit(): void {
    this.dataService.getWeatherData()
      .subscribe((data: IResponse) => {
        this.weatherData = data;
        this.populateYears();
      });

    this.filterForm.valueChanges.subscribe(value => {
      if (value.year) {
        if (this.currentYear !== value.year) {
          this.currentYear = value.year;
          this.resetCalendar();
          this.populateMonths(value.year);

          this.filterForm.patchValue({
            year: value.year,
            month: '',
            day: '',
          }, {emitEvent: false});
        }

        // always take real values (prevent previous values causes by patchValue, changes etc.)
        let year = this.filterForm.controls['year'].value;
        let month = this.filterForm.controls['month'].value;

        if (month) {
          this.populateDays(year, month);
        }
      }
    });
  }

  private resetCalendar() {
    this.calendar.months = [];
    this.calendar.days = [];
  }

  private populateYears() {
    this.calendar.years = Object.keys(this.weatherData);
  }

  private populateMonths(year: string) {
    let months = Object.keys(this.weatherData[year]);
    months.sort((a, b) => {
      return parseInt(a, 10) - parseInt(b, 10);
    });
    this.calendar.months = months;
  }

  private populateDays(year: string, month: string) {
    let days = Object.keys(this.weatherData[year][month]);
    days.sort((a, b) => {
      return parseInt(a, 10) - parseInt(b, 10);
    });
    this.calendar.days = days;
  }

  onSubmit() {
    this.chartService.setChartState({
      year: this.filterForm.value.year,
      month: this.filterForm.value.month,
      day: this.filterForm.value.day,
      yearData: this.weatherData[this.filterForm.value.year] || {},
    });
  }

}
