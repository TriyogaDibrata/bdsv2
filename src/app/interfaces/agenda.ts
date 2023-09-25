export interface AgendaSummary {
  color: string;
  end: Date;
  event: string;
  id: number;
  start: Date;
  time_end: string;
  time_start: string;
}

export interface AgendaDetail {
  agenda_lama_id: number;
  color: string;
  created_at: Date;
  desc: string;
  deskripsi_laporan: string;
  dresscode: string;
  end: Date;
  event: string;
  event_type: string;
  event_type_id: number;
  gcal_id: string;
  id: number;
  laporan: string;
  location: string;
  schedule_id: number;
  start: Date;
  surat_id: number;
  time_end: string;
  time_start: string;
  updated_at: Date;
  url_disposisi_hist: string;
  url_surat: string;
}
