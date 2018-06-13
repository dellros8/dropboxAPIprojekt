import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }
  // ngOnInit() {
  //   this.activatedRoute.url
  //     .subscribe(() => {

  //       const currentUrl = this.router.url;
  //       if (currentUrl.indexOf("&") !== -1) {
  //         const params = currentUrl.split("&");
  //         const authTokenParams = params.split("=");
  //         const authToken = authTokenParams[1];
  //         localStorage.setItem("token", authToken);
  //         this.router.navigate(["fileList"]);
  //       } else {
  //         this.router.navigate(["login"]);
  //       }
  //     })
  // }



  // login() {
  //   const authUrl = "http"
  // }
  // getFiles() {
  //   const authToken = localStorage.getItem("token");
  //   const option = {
  //     "headers": new HttpHeaders({
  //       "Authorization": authToken
  //     })
  //   }
  //   return this.http.get("files", options);
  // }
}

