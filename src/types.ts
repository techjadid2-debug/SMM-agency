export interface Lead {
  name: string;
  phone: string;
  service: string;
  timestamp: string;
}

export interface ServiceOption {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  iconName: string;
  color: string;
}

export interface CaseStudy {
  id: string;
  companyName: string;
  category: string;
  duration: string;
  results: {
    label: string;
    value: string;
    sub: string;
  }[];
  description: string;
  beforeStats: string;
  afterStats: string;
  imageUrl: string; 
}

export interface ClientReview {
  id: string;
  name: string;
  position: string;
  companyName: string;
  avatarUrl: string;
  text: string;
  rating: number;
}
