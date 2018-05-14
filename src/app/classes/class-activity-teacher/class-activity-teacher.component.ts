import { Component, OnInit } from '@angular/core';
import {Activity} from "../../model/activity.model";
import {ClassService} from "../class.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-class-activity-teacher',
  templateUrl: './class-activity-teacher.component.html',
  styleUrls: ['./class-activity-teacher.component.scss']
})
export class ClassActivityTeacherComponent implements OnInit {

  activity: Activity;
  allsubmissions: any[] = [];

  constructor(route: ActivatedRoute, private classService: ClassService) {
    let id = route.snapshot.params['activityId'];
    classService.getActivity(id).subscribe((act: Activity) => {
      this.activity = act;
    });

    classService.getAllSubmissions(id).subscribe((all: any[]) => {
      this.allsubmissions = all;
    });
  }

  ngOnInit() {
  }

}
