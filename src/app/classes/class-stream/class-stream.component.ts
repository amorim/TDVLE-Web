import { Component, OnInit } from '@angular/core';
import {Stream} from '../../model/stream.model';
import {ClassService} from '../class.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ShowCreateClassDialogComponent} from '../show-create-class-dialog/show-create-class-dialog.component';
import {ShowCreateStreamItemDialogComponent} from './show-create-stream-item-dialog/show-create-stream-item-dialog.component';

@Component({
  selector: 'app-class-stream',
  templateUrl: './class-stream.component.html',
  styleUrls: ['./class-stream.component.scss']
})
export class ClassStreamComponent implements OnInit {

  stream: Stream[];

  constructor(private classService: ClassService, private route: ActivatedRoute, public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.classService.getClass(id).subscribe((stream: any) => {
      console.log(stream);
      this.stream = stream;
    });
  }

  createStreamItem() {
    const dialogRef = this.dialog.open(ShowCreateStreamItemDialogComponent, {width: 'auto', data: {}});
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result[0]) {
        this.snackBar.open('Item created', 'Dismiss', {duration: 2000});
        this.stream.unshift(result[1]);
      }
    });
  }

  accessStream(s) {

  }

}
