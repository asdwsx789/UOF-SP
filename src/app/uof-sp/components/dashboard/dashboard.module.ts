import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ChartDataService } from '../../service/chart-data.service';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        HttpClientModule,
        DropdownModule,
        FormsModule,
        ChartModule
    ],
    providers: [
        ChartDataService
    ]
})
export class DashboardModule { }
