export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  avatar?: string;
  role: 'client' | 'provider';
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  bio?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  dateOfBirth?: string;
  religion?: string;
  caste?: string;
}

export interface UserPreferences {
  userId: string;
  notifications: boolean;
  darkMode: boolean;
  language: string;
}
