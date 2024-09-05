import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeeklyheadcountLineComponent } from './weeklyheadcount-line.component';
import { ChartDataService } from '@service/chart-data.service';

@NgModule({
    declarations: [
        WeeklyheadcountLineComponent
    ],
    imports: [
        CommonModule
    ],
    providers: [
        ChartDataService
    ]
})
export class WeeklyheadcountLineModule { }
