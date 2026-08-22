export interface CertificateResultTypes {
  id: string;
  user: string;
  result: number;
  certificate_number: string;
  pdf_file: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CertificateTypes {
  count: number;
  next: string | null;
  previous: string | null;
  results: CertificateResultTypes[];
}
