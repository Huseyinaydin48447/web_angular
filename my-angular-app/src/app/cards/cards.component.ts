import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardModalComponent } from './card-modal/card-modal.component';
import { config } from 'dotenv';
import { CardService } from '../services/card.service';
import { Card } from '../models/card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {




  constructor(
    public dialog: MatDialog,
    public cardService: CardService
  ) { }
  ngOnInit(): void {
    // this.getCards();
    this.cardService.getCards();
  }

  openAddCardModal(): void {
    this.dialog.open(CardModalComponent, {
      width: '400px'
    });
    // dialog.afterClosed().subscribe(res=>{// bu direk sayfaya eklemyi sağlar hiç yinelemeden 
    //   if(res){
    //     this.getCards();
    //   }
    // })
  }

  // getCards(): void {
  //   this.cardService.getCards()
  //     .subscribe((res: Card[]) => {
  //       this.cards = res;
  //     })
  // }
}
 