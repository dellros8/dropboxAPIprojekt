import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
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

  constructor() { }
returnItems() {
  return new Observable((observer) => {
    this.observer = observer;
    return this.observer.next(this.items);
  });
}

}
