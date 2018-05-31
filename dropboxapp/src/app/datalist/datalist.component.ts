import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-datalist',
  templateUrl: './datalist.component.html',
  styleUrls: ['./datalist.component.css']
})
export class DatalistComponent implements OnInit {
  itemArray = [];
  constructor(private dataservice: DataService) { }

  ngOnInit() {
    this.dataservice.returnItems()
      .subscribe((items) => {
        this.itemArray = items;
      });
  }

  }

}
