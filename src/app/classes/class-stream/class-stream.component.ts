import { Component, OnInit } from '@angular/core';
import {StreamItem} from '../../model/streamItem.model';
import {ClassService} from '../class.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ShowCreateClassDialogComponent} from '../show-create-class-dialog/show-create-class-dialog.component';
import {ShowCreateStreamItemDialogComponent} from './show-create-stream-item-dialog/show-create-stream-item-dialog.component';
import {ConfigService} from "../../config/config.service";

@Component({
  selector: 'app-class-stream',
  templateUrl: './class-stream.component.html',
  styleUrls: ['./class-stream.component.scss']
})
export class ClassStreamComponent implements OnInit {

  streamItems: StreamItem[] = [];
  classId = 0;
  config: any;

  constructor(private classService: ClassService, private route: ActivatedRoute, public dialog: MatDialog, private snackBar: MatSnackBar, private router: Router, private configService: ConfigService) {
    this.configService.downloadSettings().subscribe(s => {
      this.config = s;
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.classId = Number(id);
    this.classService.getClass(id).subscribe((streamItems: any[]) => {
      streamItems.sort((a, b) => {
        if (a.dueDate < b.dueDate)
          return 1;
        if (a.dueDate > b.dueDate)
          return -1;
        return 0;
      });
      this.streamItems.push(...streamItems);
    });
  }

  createQuiz() {
    this.router.navigate(['/classes/' + this.classId + '/createQuiz'], {},);
  }

  createActivity() {
    this.router.navigate(['/classes/' + this.classId + '/createActivity'], {},);
  }

}
