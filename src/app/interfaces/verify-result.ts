export interface VerifyResult {
  details: VerifyDetail[];
  jumlah_signature: number;
  nama_dokumen: string;
  notes: string;
  summary?: 'VALID' | 'INVALID';
}

export interface VerifyDetail {
  info_signer: VerifyDetail;
  info_tsa: InfoTSA;
  signature_document: SignatureDocument;
  signature_field: string;
}

export interface VerifyDetail {
  cert_user_certified: boolean;
  issuer_dn: string;
  signer_cert_validity: string;
  signer_dn: string;
  signer_name: string;
}

export interface InfoTSA {
  name: string;
  tsa_cert_validity: string;
}

export interface SignatureDocument {
  document_integrity: boolean;
  hash_value: string;
  location: string;
  reason: string;
  signature_value: string;
  signed_in: string;
  signed_using_tsa: true;
}
