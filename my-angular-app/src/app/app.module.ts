import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ContentListComponent } from './content/content-list/content-list.component';
import { ContentModule } from './content/content.module';
import { HighlightDirective } from './directives/highlight.directive';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CardsComponent } from './cards/cards.component';
import { MatCardModule } from '@angular/material/card';
import { CardItemComponent } from './cards/card-item/card-item.component';
import { CardsModule } from './cards/cards.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    AboutComponent,
    HomeComponent,
    CardsComponent,
    ContentListComponent,
    HighlightDirective,
    

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { useHash: true }),
    AppRoutingModule,
    ContentModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule, 
    MatButtonModule,
    MatCardModule,
    CardsModule,
    MatSnackBarModule,

    

    
  ],
  providers: [
    {// apileri burdan  alır direk
      provide: 'apiUrl',
      useValue: 'https://demo.limantech.com/cards/public/api'
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
