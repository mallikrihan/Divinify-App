export interface Provider extends User {
  role: "provider";
  specialization: string;
  experience: number;
  rating: number;
  reviewCount: number;
  serviceIds: string[];
  isVerified: boolean;
  bankDetails?: {
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
  };
}

export interface ProviderProfile extends Provider {
  services: Service[];
  availability?: TimeSlot[];
  portfolio?: string[];
}

export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface ProviderStatistics {
  providerId: string;
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalEarnings: number;
  averageRating: number;
}
