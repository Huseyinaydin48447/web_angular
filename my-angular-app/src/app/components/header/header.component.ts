import { Component ,OnInit } from '@angular/core';

@Component({
  selector: 'app-header',

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor(){}  
  title:string = 'angular'
  
  ngOnInit():void{
    this.title='angular5'
  }

}
