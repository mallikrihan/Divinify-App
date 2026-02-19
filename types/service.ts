export interface Service {
  id: string;
  providerId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number; // in minutes
  image?: string;
  rating: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  services: Service[];
}

export interface ServiceReview {
  id: string;
  serviceId: string;
  userId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
}

export interface ServiceFilter {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  search?: string;
}
