import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ClassService} from "../../class.service";
import {ConfigService} from "../../../config/config.service";

declare let ResizeSensor, $: any;

@Component({
  selector: 'app-report-by-student',
  templateUrl: './report-by-student.component.html',
  styleUrls: ['./report-by-student.component.scss']
})
export class ReportByStudentComponent implements OnInit, AfterViewInit {

  report: any;
  selectedStudent = 0;
  chartViews = [[200, 200], [200, 200], [200, 200]];
  schemes = ['natural', 'vivid', 'cool', 'fire', 'solar', 'air', 'aqua', 'flame'];
  config: any;

  constructor(private classService: ClassService, private ref: ChangeDetectorRef, private configService: ConfigService) {
    this.report = classService.reportData;
    this.configService.downloadSettings().subscribe(s => {
      this.config = s;
    });
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
