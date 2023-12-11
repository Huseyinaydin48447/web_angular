export interface Sender {
    name: string;
    address: string;
    email: string;
    "Vergi Dairesi": string;
    VKN: string;
  }
  
  export interface Sayin {
    name: string;
    address: string;
    Tel: string;
    TCKN: string;
    ETTN: string;
  }
  export interface ettn{
   ETTN:string
  }
  
  export interface Tablo1 {
    "Özelleştirme No": string;
    Senaryo: string;
    Fatura_Tipi: string;
    Fatura_No: string;
    Fatura_Tarihi: string;
    Fatura_Saati: string;
    Gönderme_Tarihi: string;
    Muhasabe_Fatura_No: string;
    Satış_Kanalı: string;
  }
  
  export interface Tablo2 {
    Sıra_No: string;
    Stok_Kodu: string;
    Mal_Hizmet: string;
    Birim_Fiyat: string;
    KDV_Oranı: string;
    KDV_Tutarı: string;
    Mal_Hizmet_Tutarı: string;
  }
  
  export interface Tablo3 {
    Mal_Hizmet_Toplam_Tutarı: string;
    Toplam_İskonto: string;
    "Hesaplanan_KDV(%18)": string;
    KDV_Dahil_Toplam_Tutar: string;
    "Hesaplanan_KDV_Tevkifat(%50)": string;
    Tevkifata_Tabi_İşlem_Tutarı: string;
    Tevkifata_Tabi_İşlem_Üzerinden_Hes_KDV: string;
    Ödenecek_Tutar: string;
  }
  
  export interface Sebeb {
    Tevkifat_Sebebi: string;
    Tevkifat_Sebebi_Tutarı: string;
    IBAN: string;
    Banka: string;
    Doviz_Turu: string;
    Acıklama: string;
  }
  