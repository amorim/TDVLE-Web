import { Component, OnInit } from '@angular/core';
import {Stream} from '../../../model/stream.model';

@Component({
  selector: 'app-show-create-stream-item-dialog',
  templateUrl: './show-create-stream-item-dialog.component.html',
  styleUrls: ['./show-create-stream-item-dialog.component.scss']
})
export class ShowCreateStreamItemDialogComponent implements OnInit {

  stream: Stream;

  constructor() { }

  ngOnInit() {
  }

}
