import { Component } from '@angular/core';

import { DataService } from "./data.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  files = [];

  uploadFile: FileList;

  constructor(private dataService: DataService) {
    this.dataService.getFiles()
  }
  ngOnInit() {
    this.dataService.stream
    .subscribe((files) => {
      this.files = files;
      console.log(this.files);
    })
  }

  getFiles(event) {
    this.uploadFile = event.target.files
  }

  uploadFiles() {
    let file = this.uploadFile[0]

    this.dataService.dbx.filesUpload({path: '/' + file.name, contents: file})
    .then(function(response) {
      console.log("uploaded file!!");
    })
    .catch(function(error) {
      console.error(error);
    });
  }

}