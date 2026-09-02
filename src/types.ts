export type PageId =
  | 'home'
  | 'about'
  | 'services'
  | 'portfolio'
  | 'shop'
  | 'pricing'
  | 'blog'
  | 'faqs'
  | 'contact'
  | 'quote'
  | 'terms'
  | 'privacy'
  | 'refund';

export type ServiceCategory =
  | 'printing-branding'
  | 'it-consultancy'
  | 'web-development'
  | 'app-development'
  | 'graphic-design';

export interface ServiceItem {
  id: ServiceCategory;
  title: string;
  shortDescription: string;
  tagline: string;
  icon: string;
  heroImage: string;
  subServices: string[];
  brandingServices?: string[];
  whoWeServe?: string[];
  features?: string[];
  process?: string[];
  startingPrice: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Branding' | 'Graphic Design' | 'Printing' | 'Websites' | 'Mobile Apps' | 'IT Solutions';
  client: string;
  industry: string;
  servicesProvided: string[];
  shortDescription: string;
  fullDescription: string;
  image: string;
  deliverables: string[];
  impactMetric?: string;
}

export interface ShopProduct {
  id: string;
  name: string;
  category: 'Business Printing' | 'Marketing Materials' | 'Branding' | 'Graphic Design' | 'Digital Services';
  basePrice: number;
  unit: string;
  description: string;
  image: string;
  popular?: boolean;
  options: {
    sizes?: string[];
    quantities: number[];
    materials?: string[];
    finishes?: string[];
  };
}

export interface CartItem {
  cartId: string;
  productId: string;
  productName: string;
  category: string;
  size?: string;
  quantity: number;
  material?: string;
  finish?: string;
  customArtwork: boolean;
  artworkFileName?: string;
  deliveryLocation: string;
  unitPrice: number;
  totalPrice: number;
  notes?: string;
}

export interface PricingPlan {
  id: string;
  category: 'design' | 'website' | 'app';
  name: string;
  price: string;
  numericPrice?: number;
  suitableFor: string;
  popular?: boolean;
  features: string[];
  turnaround: string;
  badge?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'Technology' | 'Branding' | 'Web Development' | 'Business Growth' | 'Design';
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  coverImage: string;
  content: string[];
  keyTakeaways: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Printing & Branding' | 'Web & Apps' | 'IT Consultancy' | 'Payment & Delivery';
}

export interface QuoteFormData {
  fullName: string;
  company: string;
  phone: string;
  email: string;
  serviceRequired: string;
  projectDescription: string;
  quantity: string;
  preferredDeliveryDate: string;
  budgetRange: string;
  fileName?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  position: string;
  company?: string;
  location: string;
  service: string;
  serviceCategory?: string;
  rating: number;
  highlight?: string;
  avatarUrl?: string;
  projectResult?: string;
}
