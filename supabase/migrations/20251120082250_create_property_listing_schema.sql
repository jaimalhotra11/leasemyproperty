/*
  # Property Listing Platform Database Schema

  ## Overview
  Creates a comprehensive database schema for a property listing platform with role-based access control.

  ## New Tables

  ### 1. `user_profiles`
  - `id` (uuid, primary key, references auth.users)
  - `email` (text, unique)
  - `full_name` (text)
  - `role` (text) - 'visitor', 'landlord', or 'admin'
  - `phone` (text)
  - `company_name` (text) - for visitors/brands
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `properties`
  - `id` (uuid, primary key)
  - `landlord_id` (uuid, references user_profiles)
  - `title` (text)
  - `description` (text)
  - `property_type` (text) - 'commercial', 'retail', 'office', etc.
  - `address_line1` (text)
  - `address_line2` (text)
  - `city` (text)
  - `state` (text)
  - `postal_code` (text)
  - `country` (text)
  - `latitude` (numeric)
  - `longitude` (numeric)
  - `size_sqft` (numeric)
  - `price_monthly` (numeric)
  - `availability_status` (text) - 'available', 'rented', 'pending'
  - `legal_requirements` (text)
  - `amenities` (text[])
  - `front_images` (text[]) - URLs of front images (not shown to renters)
  - `interior_images` (text[]) - URLs of interior images
  - `is_approved` (boolean) - admin approval status
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. `enquiries`
  - `id` (uuid, primary key)
  - `property_id` (uuid, references properties)
  - `visitor_id` (uuid, references user_profiles)
  - `company_name` (text)
  - `contact_name` (text)
  - `contact_email` (text)
  - `contact_phone` (text)
  - `message` (text)
  - `status` (text) - 'pending', 'reviewing', 'forwarded', 'closed'
  - `admin_notes` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Create policies for role-based access:
    - Visitors can view approved properties and create enquiries
    - Landlords can manage their own properties
    - Admins can manage everything
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('visitor', 'landlord', 'admin')),
  phone text,
  company_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  landlord_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  property_type text NOT NULL,
  address_line1 text NOT NULL,
  address_line2 text,
  city text NOT NULL,
  state text NOT NULL,
  postal_code text NOT NULL,
  country text NOT NULL DEFAULT 'India',
  latitude numeric,
  longitude numeric,
  size_sqft numeric NOT NULL,
  price_monthly numeric NOT NULL,
  availability_status text NOT NULL DEFAULT 'available' CHECK (availability_status IN ('available', 'rented', 'pending')),
  legal_requirements text,
  amenities text[] DEFAULT '{}',
  front_images text[] DEFAULT '{}',
  interior_images text[] DEFAULT '{}',
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  visitor_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'forwarded', 'closed')),
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Admins can read all profiles
CREATE POLICY "Admins can read all profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- RLS Policies for properties

-- Anyone can view approved properties
CREATE POLICY "Anyone can view approved properties"
  ON properties FOR SELECT
  TO authenticated
  USING (is_approved = true);

-- Landlords can view their own properties (including unapproved)
CREATE POLICY "Landlords can view own properties"
  ON properties FOR SELECT
  TO authenticated
  USING (
    landlord_id = auth.uid()
  );

-- Landlords can create properties
CREATE POLICY "Landlords can create properties"
  ON properties FOR INSERT
  TO authenticated
  WITH CHECK (
    landlord_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'landlord'
    )
  );

-- Landlords can update their own properties
CREATE POLICY "Landlords can update own properties"
  ON properties FOR UPDATE
  TO authenticated
  USING (landlord_id = auth.uid())
  WITH CHECK (landlord_id = auth.uid());

-- Landlords can delete their own properties
CREATE POLICY "Landlords can delete own properties"
  ON properties FOR DELETE
  TO authenticated
  USING (landlord_id = auth.uid());

-- Admins can view all properties
CREATE POLICY "Admins can view all properties"
  ON properties FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- Admins can update all properties
CREATE POLICY "Admins can update all properties"
  ON properties FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- RLS Policies for enquiries

-- Visitors can create enquiries
CREATE POLICY "Visitors can create enquiries"
  ON enquiries FOR INSERT
  TO authenticated
  WITH CHECK (visitor_id = auth.uid());

-- Visitors can view their own enquiries
CREATE POLICY "Visitors can view own enquiries"
  ON enquiries FOR SELECT
  TO authenticated
  USING (visitor_id = auth.uid());

-- Landlords can view enquiries for their properties
CREATE POLICY "Landlords can view property enquiries"
  ON enquiries FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = enquiries.property_id
      AND properties.landlord_id = auth.uid()
    )
  );

-- Admins can view all enquiries
CREATE POLICY "Admins can view all enquiries"
  ON enquiries FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- Admins can update all enquiries
CREATE POLICY "Admins can update all enquiries"
  ON enquiries FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_landlord ON properties(landlord_id);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(availability_status);
CREATE INDEX IF NOT EXISTS idx_properties_approved ON properties(is_approved);
CREATE INDEX IF NOT EXISTS idx_enquiries_property ON enquiries(property_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_visitor ON enquiries(visitor_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enquiries_updated_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();