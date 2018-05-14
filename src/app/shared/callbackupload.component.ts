import {AfterViewInit, Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  template: ''
})
export class CallbackComponent implements OnInit, AfterViewInit {
  url: string = "";

  constructor(private activatedRoute: ActivatedRoute) {
    }

  ngOnInit() {

    setTimeout(() => {
      window.top['callbackFileUploaded'].next(parseQuery(location.href.split('callbackFileUpload')[1]));
      window.top.document.getElementById("frame_upload")['src'] = "https://script.google.com/macros/s/AKfycbwzRrmHiuaWHmFrj720Wy4zQ_ciNnlzX3x5fVZiDuEKLRvFsCE/exec";
    });
  }

  ngAfterViewInit() {

  }
}

function parseQuery(queryString) {
  var query = {};
  var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}
