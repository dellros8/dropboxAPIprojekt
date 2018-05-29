import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DatalistComponent } from './datalist/datalist.component';
import { UploadComponent } from './upload/upload.component';
import { DataitemComponent } from './dataitem/dataitem.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DatalistComponent,
    UploadComponent,
    DataitemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
