import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';

import 'isomorphic-fetch';

const Dropbox = require('dropbox').Dropbox;

import { BehaviorSubject } from 'rxjs';
import { FileDetector } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  stream;
  public pathm = "";
  dbx;
  list = [];
  user = '';

  uploadFile: FileList;


  constructor() {
    this.updateAccessToken()
    this.stream = new BehaviorSubject(this.list);
  }

  updateAccessToken() {
    const authToken = localStorage.getItem("token");
    this.dbx = new Dropbox({ accessToken: authToken });
  }

  getFiles() {
    this.dbx.filesListFolder({ path: this.pathm })
      .then((response) => {
        this.list = response.entries;
        this.stream.next(this.list);


        Promise.all(this.list.map((entries: any) => {
          if (entries.name.endsWith("png") || entries.name.endsWith("jpg")) {
            return this.dbx.filesGetThumbnail({ path: entries.path_lower })
              .then((image) => {
                entries.thumbnail = URL.createObjectURL(image.fileBlob);
                return entries;
              })
          } else {
            return Promise.resolve(entries);
          }
        }))
          .then(() => {
            this.stream.next(this.list)
          })
      })
  }


  downloadFile(path) {
    this.dbx.filesGetTemporaryLink({ path: path })
      .then(function (data) {
        window.open(data.link, '_blank');
      })
      .catch(function (error) {
      });
    return false;
  }

  uploadFiles(event) {
    this.uploadFile = event.target.files;
    let file = this.uploadFile[0];
    this.dbx.filesUpload({ path: this.pathm + "/" + file.name, contents: file })
      .then(() => {
        alert("File uploaded, please reload page")
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}
