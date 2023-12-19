import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  users:string[]=[];
  constructor(){}
  ngOnInit(): void {
      this.users=['mehmet','ali'];
  }

}
