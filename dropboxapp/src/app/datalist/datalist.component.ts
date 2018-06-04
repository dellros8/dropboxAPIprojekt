import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-datalist',
  templateUrl: './datalist.component.html',
  styleUrls: ['./datalist.component.css']
})
export class DatalistComponent implements OnInit {
  itemArray = [];
  constructor(private dataservice: DataService) {
    this.dataservice.getFiles();
  }

  ngOnInit() {
    this.dataservice.stream
      .subscribe((files) => {
        this.itemArray = files;
        console.log(this.itemArray);

      });
  }

  }


