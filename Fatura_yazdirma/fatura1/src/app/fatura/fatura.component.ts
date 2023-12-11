import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';
import faturaData from '../fatura/fatura.json';

interface AutoTablePlugin {
  autoTable: (options: any) => void;
  previousAutoTable: { finalY: number };
}

type JsPDFWithAutoTable = jspdf.jsPDF & AutoTablePlugin;

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
  fotoraf: {
    photo1: string;
    photo2: string;
  };
}

@Component({
  selector: 'app-fatura',
  templateUrl: './fatura.component.html',
  styleUrls: ['./fatura.component.css'],
})
export class FaturaComponent implements OnInit {
  fatura: Fatura;

  constructor() {
    this.fatura = {} as Fatura;
  }

  ngOnInit(): void {
    this.fatura = this.karakter(faturaData) as Fatura;
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
    const pdf = new jspdf.jsPDF({
      unit: 'pt',
      format: 'a4',
      orientation: 'portrait',
    }) as JsPDFWithAutoTable;
    pdf.internal.pageSize.height = 753;

    pdf.internal.pageSize.width = 800;
    pdf.addFont('arialuni.ttf', 'Arial Unicode MS', 'normal');

    const initialFontSize = 9; // Kalınlık
    const lineSpacing = 15; // Yükseklik
    const fontStyle = 'italic'; 


pdf.setLineWidth(3); 
pdf.line(5, 13, 250, 13);
pdf.setLineWidth(1); 

// Sender
let y = 13; 
pdf.setFontSize(initialFontSize);
pdf.setFont(fontStyle);

for (const key in this.fatura.sender) {
  if (this.fatura.sender.hasOwnProperty(key)) {
    const text = `${this.fatura.sender[key]}`;
    pdf.text(text, 5, y += lineSpacing, { maxWidth: 800 });
  }
}


pdf.setLineWidth(3); 
pdf.line(5, y + 8, 250, y + 8);
pdf.setLineWidth(4); 

    // Display Sayin
    y += 165;
    pdf.setFontSize(15); 
    pdf.text('SAYIN', 10, y);
    
    pdf.setFontSize(8); 
    for (const key in this.fatura.sayin) {
      if (this.fatura.sayin.hasOwnProperty(key)) {
        pdf.text(` ${this.fatura.sayin[key]}`, 10, y += lineSpacing, { maxWidth: 400 });
      }
    }




    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    const centerX = pageWidth / 2;
    const centerY = pageHeight / 2;

    const adjustedCenterY = centerY - 355;


    const photoWidth = 105;
    const photoHeight = 85;
    const photoX = centerX - photoWidth / 2; 
    const photoY = adjustedCenterY + 10; 

    const photo1Path = `assets/${this.fatura.fotoraf.photo1}`;
    const photo2Path = `assets/${this.fatura.fotoraf.photo2}`;

    pdf.addImage(photo1Path, 'JPEG', photoX, photoY, photoWidth, photoHeight);

    pdf.addImage(photo2Path, 'JPEG', photoX, photoY + 100, photoWidth, photoHeight);



    const lineY = y - 10; 
    pdf.setDrawColor(0, 0, 0); 
    pdf.setLineWidth(3); 
    pdf.line(10, lineY, 250, lineY);



    //Tablo 1 
    const tablo1Data = [];
    for (const key in this.fatura.tablo1) {
      if (this.fatura.tablo1.hasOwnProperty(key)) {
        tablo1Data.push([key, this.fatura.tablo1[key]]);
      }
    }

    pdf.autoTable({
      startY: 230,
      body: tablo1Data,
      theme: 'grid',
      styles: { cellWidth: 130, halign: 'left', cellPadding: 2 },
      margin: { left: 510, right: 10 },
      rowPageBreak: 'auto',
      columnStyles: {
        0: { fontStyle: 'bold', fontSize: 8 },
        1: { fontStyle: 'normal', fontSize: 7 } 
      },
      bodyStyles: { fontSize: 7, fontStyle: 'normal' }, 
      headStyles: { fontStyle: 'bold', fontSize: 8 }, 
    });

// Tablo 2
y = pdf.previousAutoTable.finalY;
y += 40;
pdf.text('', 10, y);

const contentFontSize = 8;
const headerFontSize = 8;

const table2Data = [
  ['Sıra No', 'Stok Kodu', 'Mal Hizmet','Miktar', 'Birim Fiyat', 'KDV Oranı', 'KDV Tutarı', 'Mal Hizmet Tutarı'],
  Object.values(this.fatura.tablo2).map(value => value.toString())
];


pdf.autoTable({
  startY: y + 10,
  head: [table2Data[0]], 
  body: [table2Data[1]],
  theme: 'grid',
  headStyles: {
    fillColor: [255, 255, 255],
    textColor: 0,
    fontStyle: 'bold',
    fontSize: headerFontSize, 
    lineWidth: 0.1, 
    lineColor: [0, 0, 0], 
  },
  styles: {
    fontSize: contentFontSize, 
    halign: 'left',  
    fontStyle: 'bold',

    lineWidth: 0.1, 
    lineColor: [0, 0, 0], 
  },
  margin: { top: y }, 
});

// Tablo 3
y = pdf.previousAutoTable.finalY;
y += 5;
pdf.text('', 410, y);
const tablo3Data = [];
for (const key in this.fatura.tablo3) {
  if (this.fatura.tablo3.hasOwnProperty(key)) {
    tablo3Data.push([key, this.fatura.tablo3[key]]);
  }
}

pdf.autoTable({
  startY: y + 10,
  body: tablo3Data,
  theme: 'grid',
  styles: { cellWidth: 190, halign: 'left' },
  margin: { left: 458, right: 10 },
  columnStyles: {
    0: { fontStyle: 'bold', fontSize: 8,  halign: 'right',cellWidth: 210  },
    1: { fontStyle: 'normal', fontSize: 7, halign: 'right',cellWidth: 100 } 
  },
  bodyStyles: { fontSize: 7, fontStyle: 'normal' },
  headStyles: { fontStyle: 'bold', fontSize: 8 },
});



y = pdf.previousAutoTable.finalY;
y += 40;

const sebebRectX = 10;
const sebebRectY = y;
const sebebRectWidth = 780;
const sebebRectHeight = 85;
pdf.setLineWidth(1);
pdf.rect(sebebRectX, sebebRectY, sebebRectWidth, sebebRectHeight);
pdf.setLineWidth(1); 
pdf.text('', sebebRectX + 10, y + 10);

const availableHeight = sebebRectHeight - 20;
const lineHeight = 16;

let remainingText = '';


for (const key in this.fatura.sebeb) {
  if (this.fatura.sebeb.hasOwnProperty(key)) {
   
  }
}

pdf.text('\n' + remainingText, sebebRectX + 10, y, { maxWidth: 760 });


pdf.setFont('helvetica', 'bold');
pdf.text(`Tevkifat Sebebi1:`, sebebRectX + 10, y += lineHeight, { maxWidth: 760 });
pdf.setFont('helvetica', 'normal');
pdf.text(` ${this.fatura.sebeb['Tevkifat Sebebi']},`, sebebRectX + 80, y);

pdf.setFont('helvetica', 'bold'); 
pdf.setFont('helvetica', 'normal'); 
pdf.text(` ${this.fatura.sebeb['Tevkifat Sebebi Tutari']}`, sebebRectX + 10, y += lineHeight, { maxWidth: 760 });

pdf.setFont('helvetica', 'bold');
pdf.text(`IBAN:`, sebebRectX + 10, y += lineHeight, { maxWidth: 760 });
pdf.setFont('helvetica', 'normal');
pdf.text(` ${this.fatura.sebeb['IBAN']}`, sebebRectX + 30, y);


pdf.setFont('helvetica', 'bold');
pdf.text(`Banka:`, sebebRectX + 150, y, { maxWidth: 760 });
pdf.setFont('helvetica', 'normal');
pdf.text(` ${this.fatura.sebeb['Banka']}`, sebebRectX + 175, y);


pdf.setFont('helvetica', 'bold');
pdf.text(`Döviz Türü:`, sebebRectX + 220, y, { maxWidth: 760 });
pdf.setFont('helvetica', 'normal');
pdf.text(` ${this.fatura.sebeb['Doviz Turu']}`, sebebRectX + 265, y);

pdf.setFont('helvetica', 'normal');
pdf.text(`Aciklama: ${this.fatura.sebeb['Aciklama']}`, sebebRectX + 10, y += lineHeight, { maxWidth: 560 });



    pdf.output('dataurlnewwindow');

  }
  
}
