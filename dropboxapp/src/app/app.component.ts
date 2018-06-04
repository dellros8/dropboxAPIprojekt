import { Component } from '@angular/core';

import { DataService } from "./data.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

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

  uploadFiles(event) {
    this.uploadFile = event.target.files
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
