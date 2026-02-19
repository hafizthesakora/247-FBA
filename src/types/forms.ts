export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface QuoteFormData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  service: string;
  monthlyUnits: string;
  details: string;
}
