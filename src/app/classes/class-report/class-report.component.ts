import { Component, OnInit } from '@angular/core';
import {ClassService} from "../class.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-class-report',
  templateUrl: './class-report.component.html',
  styleUrls: ['./class-report.component.scss']
})
export class ClassReportComponent implements OnInit {

  report: any = {};
  loading = true;

  constructor(private classService: ClassService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.classService.getReport(id).subscribe(r => {
      this.report = r;
      this.loading = false;
    })
  }

}
