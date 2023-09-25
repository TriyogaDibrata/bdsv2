export interface DetailMail {
  nomor: string;
  pengirim: string;
  perihal: string;
  status_surat: string;
  tembusan: string[];
  tembusan_khusus: string[];
  tgl: '2023-09-20';
  tujuan: string[];
  undangan_acara: string;
  undangan_akhir: Date;
  undangan_awal: Date;
  undangan_desc: string;
  undangan_lokasi: string;
}

export interface Mail {
  action: [];
  balasan: [];
  detail: DetailMail;
  file_surat: string;
  lampiran: string[];
  partials: {};
  surat_id: number;
  surat_masuk_id: number;
}
