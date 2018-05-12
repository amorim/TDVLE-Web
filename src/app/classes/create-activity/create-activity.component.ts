import { Component, OnInit } from '@angular/core';
import {Activity} from "../../model/activity.model";

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss']
})
export class CreateActivityComponent implements OnInit {

  activity: Activity = new Activity();

  constructor() { }

  ngOnInit() {

  }

}
