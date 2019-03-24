import {Component, Inject, OnInit} from '@angular/core';
import {StreamItem} from '../../../model/streamItem.model';
import {ClassService} from '../../class.service';
import {ShowAppDialogComponent} from '../../../apps/show-app-dialog/show-app-dialog.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Quiz} from '../../../model/quiz.model';
import {Activity} from '../../../model/activity.model';

@Component({
  selector: 'app-show-create-stream-item-dialog',
  templateUrl: './show-create-stream-item-dialog.component.html',
  styleUrls: ['./show-create-stream-item-dialog.component.scss']
})
export class ShowCreateStreamItemDialogComponent implements OnInit {

  streamItem: StreamItem = new StreamItem();
  quiz: Quiz = new Quiz();
  activity: Activity = new Activity();
  selected = '-1';

  constructor(private classService: ClassService, public dialogRef: MatDialogRef<ShowCreateStreamItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close([false, false]);
  }

  create() {
    if (this.selected.valueOf() === '0') {
      this.quiz.title = this.streamItem.title;
      this.quiz.detail = this.streamItem.detail;


      this.classService.createQuiz(this.quiz, this.data.classId).subscribe(streamItem => {

        this.dialogRef.close([true, streamItem]);
      });
    } else {

    }
  }

  onKeyPress($event) {
    if ($event.keyCode === 13) {
      this.create();
    }
  }

}
