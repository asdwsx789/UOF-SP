import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api'
import { Subscription } from 'rxjs';
import { ChartDataService } from '@service/chart-data.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-hourlystat-stacked-bar',
    templateUrl: './hourlystat-stacked-bar.component.html',
    styleUrls: ['./hourlystat-stacked-bar.component.scss']
})
export class HourlystatStackedBarComponent implements OnInit {

    barData: BarData = {
        x_leables: [],
        hour_Q3: [],
        hour_P90: [],
        hour_max: []
    };
    chartData: any;
    chartOptions: any;

    subscription!: Subscription;

    constructor(private ChartDataService: ChartDataService, public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit(): void {
        this.getHourlyStat();
    }

    getHourlyStat() {
        this.ChartDataService.getHourlyStat()
            .subscribe({
                next: (date) => {
                    this.renderHourlyStatBar(date);
                },
                error: (response) => {
                    console.log(response);
                }
            });
    }

    // ChartJs
    Array_Sort_Numbers(inputarray) {
        return inputarray.sort(function (a, b) {
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

        if ((data[base + 1] !== undefined)) {
            return data[base] + rest * (data[base + 1] - data[base]);
        } else {
            return data[base];
        }
    }

    renderHourlyStatBar(jsonData) {
        let arr = {};
        let hour = [];

        jsonData.filter(item => {
            let time = item.time
            time = time.substring(time.length - 2);

            if (hour.indexOf(time) == -1) {
                hour.push(time);
                arr[time] = [];
            } else {
                arr[time].push(item.people);
            }
        });

        hour.sort();
        hour.forEach(hr => {
            let _arr = arr[hr].map(item => item);

            _arr = this.Array_Sort_Numbers(_arr);

            let _q3 = this.Quartile(_arr, 0.75);
            let _p90 = this.percentile(_arr, 0.9);
            let _max = _arr[_arr.length - 1];

            this.barData.hour_Q3.push(Math.ceil(_q3));
            this.barData.hour_P90.push(Math.ceil(_p90));
            this.barData.hour_max.push(_max);
        });

        this.initChart();
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17'],
            datasets: [
                {
                    label: 'MAX',
                    backgroundColor: documentStyle.getPropertyValue('--red-500'),
                    data: this.barData.hour_max
                },
                {
                    label: 'P90',
                    backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                    data: this.barData.hour_P90
                },
                {
                    label: 'Q3',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    data: this.barData.hour_Q3
                },
            ]
        };

        this.chartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
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
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
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

            },
            barPercentage: 1.0, // Full width of the category
            categoryPercentage: 0.6, // Full width of the category
        };
    }
}

interface BarData {
    x_leables: any[],
    hour_Q3: any[],
    hour_P90: any[],
    hour_max: any[]
}
