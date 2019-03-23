import { Component, OnInit } from '@angular/core';
import {ClassService} from "../class.service";
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {
  constructor(private classService: ClassService) {

  }

  ngOnInit() {
  }

  geraBoleto() {
    this.classService.generateBoletao().subscribe(b => {
      let boleto = new Blob([b], { type: 'application/pdf' });
      saveAs(boleto, 'boleto.pdf');
    });
  }
}
