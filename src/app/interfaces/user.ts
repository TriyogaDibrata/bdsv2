export interface User {
  id: number;
  opd_id: number;
  username: string;
  name: string;
  signing_name: string;
  jabatan: string;
  email_contact: string;
  avatar: string;
  api_token?: string;
  role: Role;
  is_biometric: number;
}

export class Role {
  static Admin = 'admin';
  static Signer = 'signer';
  static User = 'user';

  id: number;
  name: string;
  slug: string;
}

export class Biometric {
  biometric_token: String;
  biometric_user_id: String;
  name: String;
}
