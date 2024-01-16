export interface DocThumb {
  id: number;
  unit_kerja_id: number;
  name: string;
  desc: string;
  status: number;
  ack_id: number;
  surat_id: number;
  flag_ack: number;
  ack_order: number;
  status_label: string;
  date: Date;
  signed_date: Date;
  public_url: string;
  flag_proses: number;
  proses_label: string;
}
