export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidName(name: string): boolean {
  return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
}

export function isValidPincode(pincode: string): boolean {
  return /^[0-9]{6}$/.test(pincode);
}

export function validateForm(data: Record<string, any>, rules: Record<string, (value: any) => boolean>): Record<string, string> {
  const errors: Record<string, string> = {};
  
  for (const [field, validator] of Object.entries(rules)) {
    if (!validator(data[field])) {
      errors[field] = `${field} is invalid`;
    }
  }
  
  return errors;
}

export function hasValidationErrors(errors: Record<string, string>): boolean {
  return Object.keys(errors).length > 0;
}
