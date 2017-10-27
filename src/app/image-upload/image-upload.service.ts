import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ImageUploadService {

  constructor(private http: Http) { }

  uploadImage(image: any): Observable<any> {
    return this.http.post('https://api.cloudinary.com/v1_1/ngn/image/upload', {'file': image, 'upload_preset': 'qcbitdy3'})
      .map(res => res.json());
  }
}
