import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ImageUploadService {

  constructor(private http: HttpClient) { }

  uploadImage(image: any): Observable<any> {
    return this.http.post('https://api.cloudinary.com/v1_1/ngn/image/upload', {'file': image, 'upload_preset': 'qcbitdy3'});
  }
}
