import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import {elementClassNamed} from '@angular/core/src/render3/instructions';

import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-datalist',
  templateUrl: './datalist.component.html',
  styleUrls: ['./datalist.component.css']
})
export class DatalistComponent implements OnInit {
  itemArray = [];
  pathm = "";
  staredfiles = [];
  showStared = false;
  theUser = this.dataservice.user;
  breadcrumbs = [""];

  constructor(private dataservice: DataService, private sanitizer: DomSanitizer) {
    this.dataservice.getFiles();
  }

  ngOnInit() {
    if (localStorage.getItem(this.theUser) !== null) {
      this.staredfiles = JSON.parse(localStorage.getItem(this.theUser));
    }
    console.log(this.staredfiles, 'staredFiles');
    this.dataservice.getFiles();
    this.dataservice.stream
      .subscribe((files) => {
        this.itemArray = files;

      });

  }
  changeTimestamp(timestamp) {
    if (!timestamp) {
      return timestamp;
    }

  
let res = timestamp.split('T').join(' ');
res = res.split('Z').join(' ');
return res;




  }
  calculateFilesize(bytes) {
    if(bytes === 0) { return '0 Bytes';}
    const k = 1024,
      dm = 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];

  }
  showHideStared() {
    this.showStared === false ? this.showStared = true : this.showStared = false;
  }
  findInStarArray(fileId, fileArray) {
    const result = fileArray.find( theId => theId.fileId === fileId );
    if(result !== undefined) {
      return true;
    }

  }
  starfile(fileId) {
    const result = this.staredfiles.find( theId => theId.fileId === fileId );
if(result === undefined) {
  localStorage.removeItem(this.dataservice.user);
  this.staredfiles.push({fileId});
  console.log('Added file', this.staredfiles);
  localStorage.setItem(this.theUser, JSON.stringify(this.staredfiles));
} else {
  localStorage.removeItem(this.dataservice.user);
  this.staredfiles = this.staredfiles.filter(function(el){
    return el.fileId !== fileId;});
  localStorage.setItem(this.theUser, JSON.stringify(this.staredfiles));
  console.log('removed file', this.staredfiles);
}
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
    } else if (filetype === 'folder') {


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


