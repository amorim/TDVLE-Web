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
  chartViews = [[200, 200], [200, 200], [200, 200]];
  schemes = ['natural', 'vivid', 'cool', 'fire', 'solar', 'air', 'aqua', 'flame'];

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
    let i = 1;
    while ($("#card" + i).length) {
      let divWidth = $("#card" + i).width();
      this.chartViews[i - 1][0] = windowWidth > 700 ? divWidth * 0.6 : divWidth;
      this.chartViews[i - 1][1] = undefined;
      this.ref.detectChanges();
      i++;
    }
  }


}
