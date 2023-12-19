import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar,
 
  ) { }

  createSnackBar(message:string,duration:number=3000):void{
    this.snackBar.open(message, '',{
      duration
    })
  }
}
