import { Component, OnInit } from '@angular/core';

import { SETTINGS } from "./contants";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public settings = SETTINGS;
  public currentSettings = {
    dashboard: {
      positionClass: SETTINGS.dashboard.positionClassDefault
    }
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  public togglePosition() {
    this.currentSettings.dashboard.positionClass = SETTINGS.dashboard.positionClasses.find(i => i !== this.currentSettings.dashboard.positionClass) || SETTINGS.dashboard.positionClassDefault;
  }
}
