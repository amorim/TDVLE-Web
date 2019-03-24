import { Component, OnInit } from '@angular/core';
import {element} from 'protractor';
import {HttpClient} from '@angular/common/http';

import {Post} from '../model/post.model';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  file: any;
  driveUploaderLike = 'https://script.google.com/a/ic.ufal.br/macros/s/AKfycbyDTIugGlxklqe9TpXtY6BqAUuef3YsDKCEBxkJ/exec';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.file = event.target.files[0];

    this.http.post(this.driveUploaderLike, this.file).subscribe((lol: any) => {

    }); // NEEDS TO FIX THIS
  }

  onKeyPress($event) {
    if ($event.keyCode === 13) {

    }
  }

}
