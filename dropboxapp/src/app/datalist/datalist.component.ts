import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-datalist',
  templateUrl: './datalist.component.html',
  styleUrls: ['./datalist.component.css']
})
export class DatalistComponent implements OnInit {
  itemArray = [];
  breadcrumbs = [""];

  constructor(private dataservice: DataService) {
    this.dataservice.getFiles();
  }

  ngOnInit() {
    this.dataservice.stream
      .subscribe((files) => {
        this.itemArray = files;
      });
  }
  navigate(breadcrumb) {
    let index = 0;
    for (let i = 0; i < this.breadcrumbs.length; i++) {
      if (breadcrumb !== this.breadcrumbs[i]) {
        index += 1
      } else {
        break
      }
    }

    const tjabba = this.breadcrumbs.slice(0, index+1);
    this.breadcrumbs = tjabba;
    const tjena = tjabba.join("/");

    this.dataservice.dbx.filesListFolder({ path: tjena })
        .then((response) => {
          this.dataservice.list = response.entries;
          this.dataservice.stream.next(this.dataservice.list);
        })
  }
  download(path, filetype, filename) {
    if (filetype === 'file') {
      this.dataservice.downloadFile(path);
    } else if (filetype === "folder") {

      this.dataservice.pathm = path;
      this.breadcrumbs = path.split("/"); 

      this.dataservice.dbx.filesListFolder({ path: this.dataservice.pathm })
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
    const lol = this.dataservice.pathm.split("/");
    lol.splice(-1, 1);
    this.breadcrumbs = lol;
    const wtf = lol.join("/");
    this.dataservice.pathm = wtf;
  
    this.dataservice.dbx.filesListFolder({ path: this.dataservice.pathm })
        .then((response) => {
          this.dataservice.list = response.entries;
          this.dataservice.stream.next(this.dataservice.list);
        })
  }

  pathDisplay() {
    this.breadcrumbs.join(">");
  }
}


