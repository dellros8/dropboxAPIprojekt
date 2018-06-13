import { Component } from '@angular/core';
import { LoginService } from "../login.service";
import { DataService } from "../data.service";


@Component({
  selector: 'app-datalist',
  templateUrl: './datalist.component.html',
  styleUrls: ['./datalist.component.css']
})
export class DatalistComponent {

  constructor(private loginservice: LoginService, private dataService: DataService) {

    this.dataService.getFiles();
  }

  ngOnInit() {
  }

}
