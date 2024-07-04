import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api'
import { ChartDataService } from '@service/chart-data.service';
import { testAPI } from '@uofmodule/uof-person.module';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    hour: testAPI;
    date: Date = new Date();

    weekOptions: SelectItem[] = [];
    selectedOption: SelectItem;
    placeholder: string = "選擇周";

    chartData: any;
    chartOptions: any;

    constructor(private ChartDataService: ChartDataService) { }

    ngOnInit(): void {
        this.weekOptions = this.getWorkdayRanges(this.date);

        this.placeholder = this.getWeekStartEndDays(this.date);

        this.getPeopleList(this.placeholder);

        // this.getPeopleList(this.placeholder);

        console.log()
    }

    onSortChange(event: SelectItem) {
        this.selectedOption = event;
        this.placeholder = this.selectedOption.value;
        this.getPeopleList(this.placeholder);
    }

    getWorkdayRanges(date: Date): SelectItem[] {
        const options: SelectItem[] = [];
        const month = date.getMonth();
        let current = new Date(date.getFullYear(), month, 1);
        let i = 0;

        while (current.getMonth() === month) {
            const start = new Date(current);
            const end = new Date(current);

            // Set the start date to the Monday of the current week
            while (start.getDay() !== 1) {
                start.setDate(start.getDate() - 1);
            }

            // Set the end date to the Friday of the current week
            while (end.getDay() !== 5) {
                end.setDate(end.getDate() + 1);
            }

            options.push({
                label: `${this.formatDate(start)}~${this.formatDate(end)}`,
                value: `${this.formatDate(start)}~${this.formatDate(end)}`
            });

            // Move to the next Monday
            end.setDate(end.getDate() + 3);
            current = end;
        }

        return options
    }

    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${month}/${day}`;
    }

    getWeekStartEndDays(date: Date){
        const start = new Date(date);
        const end = new Date(date);

        while (start.getDay() !== 1) {
            start.setDate(start.getDate() - 1);
        }

        while (end.getDay() !== 5) {
            end.setDate(end.getDate() + 1);
        }
        
        const now = `${this.formatDate(start)}~${this.formatDate(end)}`;

        return now;
    }

    getPeopleList(weekDays: string){
        const date: Date = new Date();
        let year = date.getFullYear().toString();

        const postData = {
            _year: year,
            _weekDays: weekDays
        };
        
        this.ChartDataService.getPeopleListForWeek(postData)
        .subscribe({
            next: (date) => {
                this.renderLine(date);
            },
            error: (response) => {
                console.log(response);
            }
        });
    }

    // ChartJs
    Array_Sort_Numbers(inputarray){
        return inputarray.sort(function(a, b) {
            return a - b;
        });
    }

    // https://gist.github.com/IceCreamYou/6ffa1b18c4c8f6aeaad2
    percentile(arr, p) {
        if (arr.length === 0) return 0;
        if (typeof p !== 'number') throw new TypeError('p must be a number');
        if (p <= 0) return arr[0];
        if (p >= 1) return arr[arr.length - 1];

        var index = (arr.length - 1) * p,
            lower = Math.floor(index),
            upper = lower + 1,
            weight = index % 1;

        if (upper >= arr.length) return arr[lower];
        return arr[lower] * (1 - weight) + arr[upper] * weight;
    }

    // https://stackoverflow.com/questions/48719873/how-to-get-median-and-quartiles-percentiles-of-an-array-in-javascript-or-php
    Quartile(data, q) {
        var pos = ((data.length) - 1) * q;
        var base = Math.floor(pos);
        var rest = pos - base;

        if( (data[base + 1] !== undefined) ) {
            return data[base] + rest * (data[base + 1] - data[base]);
        } else {
            return data[base];
        }
    }

    renderLine(jsondata: any){
        let arr = {};
        let yearm = [];
        let data_Q3 = [];
        let data_P90 = [];
        let data_max = [];

        let x_leables = [];

        jsondata.filter(item => {
            let time = item.time;

            if(yearm.indexOf(time) == -1) {
                // _category[0]["category"].push( {label: time} );
                yearm.push(time);
                arr[time] = [];
            }else {
                arr[time].push(item.people);
            }
        });

        yearm.forEach(date => {
            let _arr = arr[date].map(item => item);
            _arr = this.Array_Sort_Numbers(_arr);

            let _q3 = this.Quartile(_arr, 0.75);
            let _p90 = this.percentile(_arr, 0.9);
            let _max = _arr[_arr.length - 1];

            data_Q3.push(Math.ceil(_q3));
            data_P90.push(Math.ceil(_p90));
            data_max.push(_max);
        });

        let nowDate: Date = new Date();
        let startDay: Date;
        let _year: number;

        while (nowDate.getDay() !== 1) {
            nowDate.setDate(nowDate.getDate() - 1);
        }
        _year = nowDate.getFullYear();

        startDay = new Date(_year + "/" + this.placeholder.substring(0,5));

        while(startDay.getDay() !== 6) {
            let month = startDay.getMonth() + 1;
            let day = startDay.getDay();

            x_leables.push(month + "/" + day);

            startDay.setDate(startDay.getDate() + 1);
        }

        // if(yearm.length != 5) {
        //     for (let index = 0; index < 5 - yearm.length; index++) {
        //         data_Q3.push("");
        //         data_P90.push("");
        //         data_max.push("");
        //     }
        // }

        this.initChart(x_leables, data_Q3, data_P90, data_max);

        console.log(x_leables);
    }

    initChart(x_leables, data_Q3, data_P90, data_max) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: x_leables,
            datasets: [
                {
                    label: 'Q3',
                    data: data_Q3,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                },
                {
                    label: 'P90',
                    data: data_P90,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--blue-700'),
                    borderColor: documentStyle.getPropertyValue('--blue-700'),
                    tension: .4
                },
                {
                    label: 'Max',
                    data: data_max,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--red-600'),
                    borderColor: documentStyle.getPropertyValue('--red-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };  
    }
}
