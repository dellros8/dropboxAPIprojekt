import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    username: '',
    password: '',
  };
  constructor() { }

  ngOnInit() {
    console.log(this.credentials.username, 'username');
    console.log(this.credentials.password, 'password');

  }

}
