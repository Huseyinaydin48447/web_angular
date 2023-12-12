// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { FaturaComponent } from './fatura/fatura.component'; 

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    FaturaComponent, 
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
