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


}
