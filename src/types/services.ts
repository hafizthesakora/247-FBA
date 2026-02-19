export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  slug: string;
  image: string;
  features: string[];
  benefits: string[];
  isComingSoon?: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  priceUnit: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface AddOn {
  name: string;
  price: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  quote: string;
  rating: number;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
