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
  observer;
  items = [
    {
      name: 'School work',
      date: '2018-05 30',
      icon: 'folder.png'
    },
    {
      name: 'Important notes.txt',
      date: '1999-03-25',
      icon: 'file.png'
    },
    {
      name: 'Things to remember.txt',
      date: '2016-12.03',
      icon: 'file.png'
    },
    {
      name: 'turning torso.pptx',
      date: '2007-06-26',
      icon: 'file.png'
    },
  ];


  constructor() {
  this.dbx = new Dropbox({ accessToken: 'o6_f4NF_pIAAAAAAAAAABz8hX_Q0CxwZQag2M9E5v0-KleP2Bzp1ynSv5nBaV25v' });
    this.stream = new BehaviorSubject(this.list);
  }

returnItems() {
  return new Observable((observer) => {
    this.observer = observer;
    return this.observer.next(this.items);
  });
}
  getFiles() {
    this.dbx.filesListFolder({ path: '' })
      .then((response) => {
        this.list = response.entries;
        this.stream.next(this.list);
      });
  }


}
