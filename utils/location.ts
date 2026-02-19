export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface LocationAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface Location extends LocationCoordinates {
  address: string;
  formattedAddress?: string;
}

export function calculateDistance(
  from: LocationCoordinates,
  to: LocationCoordinates
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((to.latitude - from.latitude) * Math.PI) / 180;
  const dLon = ((to.longitude - from.longitude) * Math.PI) / 180;
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((from.latitude * Math.PI) / 180) *
      Math.cos((to.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${(distance * 1000).toFixed(0)}m`;
  }
  return `${distance.toFixed(2)}km`;
}

export function isWithinRadius(
  userLocation: LocationCoordinates,
  providerLocation: LocationCoordinates,
  radiusInKm: number
): boolean {
  const distance = calculateDistance(userLocation, providerLocation);
  return distance <= radiusInKm;
}

export function getMapURL(location: Location): string {
  const { latitude, longitude, address } = location;
  return `https://www.google.com/maps/@${latitude},${longitude},15z?q=${encodeURIComponent(address)}`;
}

export function parseAddress(formattedAddress: string): LocationAddress {
  // This is a simple parser, in a real app you'd use a geocoding API
  const parts = formattedAddress.split(',').map((part) => part.trim());
  return {
    street: parts[0] || '',
    city: parts[1] || '',
    state: parts[2] || '',
    country: parts[3] || '',
    pincode: '',
  };
}
