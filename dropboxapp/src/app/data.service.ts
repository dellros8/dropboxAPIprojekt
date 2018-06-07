import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import 'isomorphic-fetch';

const Dropbox = require('dropbox').Dropbox;

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  stream;
  dbx;
  list = [];

  uploadFile: FileList;


  constructor() {
    this.dbx = new Dropbox({ accessToken: 'o6_f4NF_pIAAAAAAAAAABz8hX_Q0CxwZQag2M9E5v0-KleP2Bzp1ynSv5nBaV25v' });
    this.stream = new BehaviorSubject(this.list);
  }

  getFiles() {
    this.dbx.filesListFolder({ path: '' })
      .then((response) => {
        this.list = response.entries;
        this.stream.next(this.list);
      });


  }

  downloadFile(path) {
    // const ACCESS_TOKEN = (<HTMLInputElement> document.getElementById('access-token')).value;
    // const SHARED_LINK = (<HTMLInputElement> document.getElementById('shared-link')).value;

    this.dbx.filesGetTemporaryLink({path: path})
      .then(function(data) {
        // NOTE: The Dropbox SDK specification does not include a fileBlob
        // field on the FileLinkMetadataReference type, so it is missing from
        // the TypeScript type. This field is injected by the Dropbox SDK.

        window.open(data.link, '_blank');
        const downloadUrl = URL.createObjectURL((<any> data).fileBlob);
        const downloadButton = document.createElement('a');
        downloadButton.setAttribute('href', downloadUrl);
        downloadButton.setAttribute('download', data.name);
        downloadButton.setAttribute('class', 'button');
        downloadButton.innerText = 'Download: ' + data.name;
        document.getElementById('results').appendChild(downloadButton);

      })
      .catch(function(error) {
      });
    return false;
  }


  uploadFiles(event) {
    this.uploadFile = event.target.files
    let file = this.uploadFile[0]

    this.dbx.filesUpload({ path: '/' + file.name, contents: file })
      .then(() => {
        console.log("uploaded file!!");
      })
      .catch(function (error) {
        console.error(error);
      });
  }




}
