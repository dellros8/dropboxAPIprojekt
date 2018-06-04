import { Component } from '@angular/core';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {}
}

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

  uploadFiles() {
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
