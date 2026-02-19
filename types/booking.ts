export type BookingStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  clientId: string;
  providerId: string;
  serviceId: string;
  status: BookingStatus;
  scheduledDate: string;
  scheduledTime: string;
  duration: number; // in minutes
  totalPrice: number;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingDetails extends Booking {
  client: any;
  provider: any;
  service: any;
}

export interface CreateBookingPayload {
  serviceId: string;
  providerId: string;
  scheduledDate: string;
  scheduledTime: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  notes?: string;
}

export interface BookingFilter {
  status?: BookingStatus;
  providerId?: string;
  clientId?: string;
  dateFrom?: string;
  dateTo?: string;
}
