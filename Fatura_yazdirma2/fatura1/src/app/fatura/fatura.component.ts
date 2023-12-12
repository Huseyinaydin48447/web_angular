import { Component, OnInit } from '@angular/core';
import faturaData from '../fatura/fatura.json';

interface Tablo {
  [key: string]: string;
}

interface Fatura {
  sender: Tablo;
  sayin: Tablo;
  tablo1: Tablo;
  tablo2: Tablo;
  tablo3: Tablo;
  sebeb: Tablo;
  ettn: {
    ETTN: string;
  };fotoraf: {
    [key: string]: string;
  };
}

@Component({
  selector: 'app-fatura',
  templateUrl: './fatura.component.html',
  styleUrls: ['./fatura.component.css'],
})
export class FaturaComponent implements OnInit {
  fatura: Fatura;
  sebebData: any;

  constructor() {
    this.fatura = {} as Fatura;
  }

  ngOnInit(): void {
    this.fatura = this.karakter(faturaData) as Fatura;
    this.sebebData = this.fatura.sebeb;

  }

  karakter(obj: any): any {
    if (typeof obj === 'string') {
      return obj
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ı/g, 'i')
        .replace(/ç/g, 'c');
    } else if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          obj[key] = this.karakter(obj[key]);
        }
      }
    }

    return obj;
  }

  generatePDF(): void {
  }

  getKeys(obj: Tablo): string[] {
    return Object.keys(obj);
  }
  
}
