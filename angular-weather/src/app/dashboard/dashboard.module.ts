import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DataService } from '../services/data.service';
import { ChartService } from './services/chart.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MonthPipe } from './pipes/month.pipe';
import { ChartsComponent } from './components/charts/charts.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    MonthPipe,
    ChartsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DashboardRoutingModule,
    // MDBBootstrapModule.forRoot(),
    ChartsModule,
    WavesModule,

    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
  providers: [
    ChartService,
    DataService
  ]
})
export class DashboardModule { }
