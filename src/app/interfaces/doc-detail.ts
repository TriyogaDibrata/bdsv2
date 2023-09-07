export interface DocDetail {
  id: number;
  unit_kerja_id: number;
  name: string;
  desc: string;
  status: number;
  ack_id: number;
  surat_id: number;
  flag_ack: number;
  ack_order: number;
  type_user: number;
  ttds: string[];
  unit_kerja: string;
  nama_opd: string;
  lampiran: lampiran[];
  acks: ack[];
  notes: note[];
  balasan: string[];
  status_label: string;
  date: Date;
  signed_date: Date;
  public_url: string;
  file: file[];
}

export interface lampiran {
  external_path: string;
}

export interface ack {
  nama: string;
  status: number;
  order: number;
}

export interface note {
  name: string;
  catatan: string;
  created_at: string;
}

export interface file {
  id: number;
  page_ttd: number;
  flag_signed: number;
  visualisasi_tte_id: number;
  doc_url: string;
}
