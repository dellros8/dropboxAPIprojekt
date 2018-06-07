import { Component } from '@angular/core';

import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  files = [];

  constructor(private dataService: DataService) {
    this.dataService.getFiles();
  }
  ngOnInit() {
    this.dataService.stream
    .subscribe((files) => {
      this.files = files;
      console.log(this.files);
    })
  }

}
