import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { DomSanitizer } from "@angular/platform-browser";


@Component({
  selector: 'app-datalist',
  templateUrl: './datalist.component.html',
  styleUrls: ['./datalist.component.css']
})
export class DatalistComponent implements OnInit {
  itemArray = [];
  breadcrumbs = [""];

  constructor(private dataservice: DataService, private sanitizer: DomSanitizer) {
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

    const tjabba = this.breadcrumbs.slice(0, index + 1);
    this.breadcrumbs = tjabba;
    const tjena = tjabba.join("/");
    this.dataservice.pathm = tjena;
    this.dataservice.getFiles()
  }

  openFile(path, filetype) {
    if (filetype === 'file') {
      this.dataservice.downloadFile(path);
    } else if (filetype === "folder") {

      this.dataservice.pathm = path;
      this.breadcrumbs = this.dataservice.pathm.split("/");

      this.dataservice.getFiles()

    } else {
      alert("couldn't download or locate folder");
    }
  }

  previousFolder() {
    const lol = this.dataservice.pathm.split("/");

    if (lol.length > 1) {
      lol.splice(-1, 1);
      this.breadcrumbs = lol;
      const wtf = lol.join("/");
      this.dataservice.pathm = wtf;
    }

    this.dataservice.getFiles()
  }

  sanitize(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url)
  }

  hasThumbnail(url) {
    return url != undefined
  }
}


