import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-datalist',
  templateUrl: './datalist.component.html',
  styleUrls: ['./datalist.component.css']
})
export class DatalistComponent implements OnInit {
  itemArray = [];
  pathm = "";
  breadcrumbs = [];

  constructor(private dataservice: DataService) {
    this.dataservice.getFiles();
  }

  ngOnInit() {
    this.dataservice.stream
      .subscribe((files) => {
        this.itemArray = files;

      });
  }
  download(path, filetype, filename) {
    if (filetype === 'file') {
      this.dataservice.downloadFile(path);
    } else if (filetype === "folder") {

      this.pathm = path;
      this.breadcrumbs = path.split("/");

      this.dataservice.dbx.filesListFolder({ path: this.pathm })
        .then((response) => {
          this.dataservice.list = response.entries;
          this.dataservice.stream.next(this.dataservice.list);
        })
        .catch((e) => {
          console.error(e);
        })

    } else {
      alert("couldn't download or locate folder");
    }
  }

  previousFolder() {
    const lol = this.pathm.split("/");
    lol.splice(-1, 1);
    this.breadcrumbs = lol;
    const wtf = lol.join("/");
    this.pathm = wtf;
  
    this.dataservice.dbx.filesListFolder({ path: this.pathm })
        .then((response) => {
          this.dataservice.list = response.entries;
          this.dataservice.stream.next(this.dataservice.list);
        })
  }
}


