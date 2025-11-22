export type UserRole = 'visitor' | 'landlord' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  phone?: string;
  company_name?: string;
  created_at: string;
  updated_at: string;
}

export type PropertyType = 'commercial' | 'retail' | 'office' | 'warehouse' | 'showroom';
export type AvailabilityStatus = 'available' | 'rented' | 'pending';

export interface Property {
  id: string;
  landlord_id: string;
  title: string;
  description: string;
  property_type: PropertyType;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  latitude?: number;
  longitude?: number;
  size_sqft: number;
  price_monthly: number;
  availability_status: AvailabilityStatus;
  legal_requirements?: string;
  amenities: string[];
  front_images: string[];
  interior_images: string[];
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export type EnquiryStatus = 'pending' | 'reviewing' | 'forwarded' | 'closed';

export interface Enquiry {
  id: string;
  property_id: string;
  visitor_id: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  message: string;
  status: EnquiryStatus;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}
