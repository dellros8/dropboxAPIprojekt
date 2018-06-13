import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {elementClassNamed} from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-datalist',
  templateUrl: './datalist.component.html',
  styleUrls: ['./datalist.component.css']
})
export class DatalistComponent implements OnInit {
  itemArray = [];
  pathm = "";
  breadcrumbs = [];
  staredfiles = [];
  showStared = false;
  theUser = this.dataservice.user;

  constructor(private dataservice: DataService) {
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
        console.log(files);
      });

  }
  showHideStared() {
    if (this.showStared === false) {
      this.showStared = true;
    } else {
      this.showStared = false;
    }
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
  starStyling(fileId) {


  }

  download(path, filetype, filename) {
    if (filetype === 'file') {
      this.dataservice.downloadFile(path);
    } else if (filetype === 'folder') {

      this.pathm = path;
      this.breadcrumbs = path.split('/');

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


