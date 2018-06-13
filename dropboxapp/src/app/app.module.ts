import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DatalistComponent } from './datalist/datalist.component';
import { UploadComponent } from './upload/upload.component';
import { DataitemComponent } from './dataitem/dataitem.component';

import { DataService } from "./data.service";
import { RouterModule, Routes } from "@angular/router";

const route: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DatalistComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DatalistComponent,
    UploadComponent,
    DataitemComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(route)
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
