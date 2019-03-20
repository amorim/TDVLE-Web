import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ClassService} from '../../class.service';

declare let ResizeSensor, $: any;

@Component({
  selector: 'app-report-overview',
  templateUrl: './report-overview.component.html',
  styleUrls: ['./report-overview.component.scss']
})


export class ReportOverviewComponent implements OnInit, AfterViewInit {
  report: any;
  chartViews = [[200, 200]];

  constructor(private classService: ClassService, private ref: ChangeDetectorRef) {
    this.report = classService.reportData;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    new ResizeSensor($("#chart1"), () => {
      this.updateCharts();
    });
    this.updateCharts();
  }

  updateCharts() {
    let windowWidth = $(window).width();
    let divWidth = $("#card1").width();
    console.log(windowWidth, divWidth);
    this.chartViews[0][0] = windowWidth > 700 ? divWidth * 0.6 : divWidth;
    this.chartViews[0][1] = undefined;
    console.log(this.chartViews[0]);
    this.ref.detectChanges();
  }

}
