import { NgModule } from "@angular/core";
import { FaturaComponent } from "./fatura/fatura.component";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [
    FaturaComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
})
export class AppModule {}
