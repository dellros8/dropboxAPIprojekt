import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private actvRoute: ActivatedRoute) { }

  ngOnInit() {
    this.actvRoute.url
      .subscribe(() => {

        const currentUrl = this.router.url;

        if (currentUrl.indexOf("&") !== -1) {

          const params = currentUrl.split("&");
          const authTokenParams = params[0].split("=");
          const authToken = authTokenParams[authTokenParams.length-1];
          localStorage.setItem("token", authToken);
          if (localStorage.getItem("token") === "The+user+chose+not+to+give+your+app+access+to+their+Dropbox+account.") {
            localStorage.removeItem("token");
          }
          console.log("token", authToken);
          this.router.navigate([""]);
        } else {
          this.router.navigate(["login"]);
        }
      })
  }



  login() {
    window.location.href = "https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=g0ni8qp26hhwbcy&redirect_uri=http://localhost:4200/login"
  }
}

