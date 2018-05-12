import { Component, OnInit } from '@angular/core';
import {Activity} from "../../model/activity.model";
import {ClassService} from "../class.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-class-stream',
  templateUrl: './class-stream.component.html',
  styleUrls: ['./class-stream.component.scss']
})
export class ClassStreamComponent implements OnInit {

  posts: Activity[] = [];

  constructor(private classService: ClassService, private route: ActivatedRoute) {
    const id = route.snapshot.paramMap.get('id');
    classService.getClass(id).subscribe((acts: Activity[]) => {
      this.posts = acts;
    });
  }

  ngOnInit() {

  }

}
