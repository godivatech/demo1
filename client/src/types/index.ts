export interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  features: string[];
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  isBestseller?: boolean;
  isNew?: boolean;
  category: string;
}

export interface ProductCategory {
  id: string;
  name: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  content: string;
  hasVideo: boolean;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
}

export interface BeforeAfter {
  id: number;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

export interface Stat {
  id: number;
  value: string;
  label: string;
}

export interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  consent: boolean;
}
