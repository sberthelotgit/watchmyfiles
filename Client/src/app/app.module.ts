import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatExpansionModule,
  MatCardModule,
  MatToolbarModule,
} from '@angular/material';

import { FilesBrowserComponent } from './files/files-browser/files-browser.component';
import { HeaderComponent } from './header/header.component';
import { FilesService } from './files/files.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, FilesBrowserComponent, HeaderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
