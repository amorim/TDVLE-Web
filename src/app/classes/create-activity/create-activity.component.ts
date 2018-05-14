import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Activity} from "../../model/activity.model";
import {Submission} from "../../model/submission.model";
import {BehaviorSubject} from "rxjs/index";
import {MatSnackBar} from "@angular/material";
import {ClassService} from "../class.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss']
})

export class CreateActivityComponent implements OnInit, AfterViewInit {

  activity: Activity = new Activity();
  submissions: Submission[] = [];
  hour: string = "23:59";
  uploadedSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private ref: ChangeDetectorRef, private snackBar: MatSnackBar, private classService: ClassService, private route: ActivatedRoute, private router: Router) {
    window['callbackFileUploaded'] = this.uploadedSubject;
  }

  ngOnInit() {
    this.uploadedSubject.subscribe(k => {
      if (!k)
        return;
      this.fileUploadCompleted(k);
    });
  }

  ngAfterViewInit() {

  }

  fileUploadCompleted(filedata) {
    let submision = new Submission();
    submision.url = filedata.url;
    submision.fileName = filedata.name;
    submision.fileType = filedata.type;
    this.submissions.push(submision);
    this.ref.detectChanges();
  }

  submit() {
    this.activity.dueDate.setHours(parseInt(this.hour.split(':')[0]));
    this.activity.dueDate.setMinutes(parseInt(this.hour.split(':')[1]));
    if (this.activity.dueDate <= new Date()) {
      this.snackBar.open('Please choose a valid due date', 'Dismiss', {duration: 2000});
      return;
    }
    this.activity.teacherSubmissions = this.submissions;
    console.log(this.activity);
    this.classService.createActivity(this.activity, this.route.snapshot.params['id']).subscribe(act => {
      this.snackBar.open('Activity created', 'Dismiss', {duration: 2000});
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }

}
