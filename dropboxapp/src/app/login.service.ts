import { Injectable } from '@angular/core';
import { Router, CanActivate } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (localStorage.getItem("token") != null) {
      return true;
    } else {
      this.router.navigate(["login"]);
      return false;
    }
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }

}
