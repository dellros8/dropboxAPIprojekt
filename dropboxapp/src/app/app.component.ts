import { Component } from '@angular/core';
import { DataService } from './data.service';
import { DatalistComponent } from './datalist/datalist.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  files = [];

  constructor(private dataService: DataService) {
    this.dataService.getFiles();
  }
  showHide() {

  }
  ngOnInit() {
    this.dataService.stream
    .subscribe((files) => {
      this.files = files;
    })
  }

}
