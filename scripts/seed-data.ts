import mongoose from 'mongoose';
import { UserProfile } from '@/models/UserProfile';
import { Property } from '@/models/Property';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/leasemyproperty';

const dummyLandlords = [
  {
    email: 'rajesh.property@email.com',
    full_name: 'Rajesh Kumar',
    role: 'landlord',
    phone: '+91 98765 43210',
    company_name: 'Kumar Real Estate Group',
    password_hash: '',
  },
  {
    email: 'priya.estates@email.com',
    full_name: 'Priya Sharma',
    role: 'landlord',
    phone: '+91 98765 43211',
    company_name: 'Sharma Commercial Properties',
    password_hash: '',
  },
  {
    email: 'amit.properties@email.com',
    full_name: 'Amit Patel',
    role: 'landlord',
    phone: '+91 98765 43212',
    company_name: 'Patel Property Ventures',
    password_hash: '',
  },
  {
    email: 'sneha.realestate@email.com',
    full_name: 'Sneha Reddy',
    role: 'landlord',
    phone: '+91 98765 43213',
    company_name: 'Reddy Real Estate Solutions',
    password_hash: '',
  },
  {
    email: 'vikram.properties@email.com',
    full_name: 'Vikram Singh',
    role: 'landlord',
    phone: '+91 98765 43214',
    company_name: 'Singh Property Holdings',
    password_hash: '',
  },
  {
    email: 'anita.estates@email.com',
    full_name: 'Anita Desai',
    role: 'landlord',
    phone: '+91 98765 43215',
    company_name: 'Desai Commercial Estates',
    password_hash: '',
  },
];

const dummyProperties = [
  {
    title: 'Premium Office Space in Connaught Place',
    description: 'Spacious 5000 sq ft office space in the heart of Delhi. Perfect for corporate headquarters with modern amenities, high-speed internet, and 24/7 security. Located in prime business district with excellent connectivity.',
    property_type: 'office',
    address_line1: 'Block A, Connaught Place',
    address_line2: 'Near Metro Station',
    city: 'Delhi',
    state: 'Delhi',
    postal_code: '110001',
    country: 'India',
    latitude: 28.6304,
    longitude: 77.2177,
    size_sqft: 5000,
    price_monthly: 450000,
    availability_status: 'available',
    legal_requirements: 'GST registration required. Lease agreement for minimum 3 years.',
    amenities: ['WiFi', 'Parking', 'Security', '24/7 Access', 'Cafeteria', 'Elevator', 'Power Backup'],
    front_images: ['https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'],
    interior_images: [
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
      'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg',
    ],
    is_approved: true,
    is_premium: true,
    is_featured: true,
    view_count: 245,
    enquiries_count: 12,
  },
  {
    title: 'Modern Retail Space in Bandra West',
    description: 'Prime retail space of 2000 sq ft in Bandra, Mumbai. High footfall area, perfect for fashion brands, restaurants, or showrooms. Glass facade with excellent visibility.',
    property_type: 'retail',
    address_line1: 'Hill Road, Bandra West',
    address_line2: 'Opposite Bandra Station',
    city: 'Mumbai',
    state: 'Maharashtra',
    postal_code: '400050',
    country: 'India',
    latitude: 19.0596,
    longitude: 72.8295,
    size_sqft: 2000,
    price_monthly: 350000,
    availability_status: 'available',
    legal_requirements: 'Shop Act license required. Minimum 2 years lease.',
    amenities: ['WiFi', 'Parking', 'Security', '24/7 Access'],
    front_images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'],
    interior_images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
    ],
    is_approved: true,
    is_premium: true,
    is_featured: false,
    view_count: 189,
    enquiries_count: 8,
  },
  {
    title: 'Warehouse Facility in Whitefield',
    description: 'Large warehouse space of 15000 sq ft in Whitefield, Bangalore. Ideal for logistics, storage, or manufacturing. Gated compound with loading docks and truck parking.',
    property_type: 'warehouse',
    address_line1: 'Whitefield Industrial Area',
    address_line2: 'Near ITPL',
    city: 'Bangalore',
    state: 'Karnataka',
    postal_code: '560066',
    country: 'India',
    latitude: 12.9698,
    longitude: 77.7499,
    size_sqft: 15000,
    price_monthly: 250000,
    availability_status: 'available',
    legal_requirements: 'Trade license required. Fire safety certificate mandatory.',
    amenities: ['Parking', 'Security', '24/7 Access', 'Loading Dock'],
    front_images: ['https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg'],
    interior_images: [
      'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg',
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg',
    ],
    is_approved: true,
    is_premium: false,
    is_featured: false,
    view_count: 156,
    enquiries_count: 5,
  },
  {
    title: 'Co-working Space in Koramangala',
    description: 'Fully furnished co-working space of 3000 sq ft in Koramangala. Includes meeting rooms, phone booths, high-speed internet, and community areas. Perfect for startups and freelancers.',
    property_type: 'office',
    address_line1: '5th Block, Koramangala',
    address_line2: 'Near Forum Mall',
    city: 'Bangalore',
    state: 'Karnataka',
    postal_code: '560095',
    country: 'India',
    latitude: 12.9352,
    longitude: 77.6245,
    size_sqft: 3000,
    price_monthly: 180000,
    availability_status: 'available',
    legal_requirements: 'Business registration required.',
    amenities: ['WiFi', 'Parking', 'Security', 'Cafeteria', 'Meeting Rooms', 'Phone Booths'],
    front_images: ['https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg'],
    interior_images: [
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    ],
    is_approved: true,
    is_premium: true,
    is_featured: true,
    view_count: 312,
    enquiries_count: 15,
  },
  {
    title: 'Showroom Space in MG Road',
    description: 'Premium showroom space of 2500 sq ft on MG Road, Bangalore. High visibility location with glass frontage. Ideal for automobile, electronics, or luxury brands.',
    property_type: 'showroom',
    address_line1: 'MG Road',
    address_line2: 'Near Trinity Circle',
    city: 'Bangalore',
    state: 'Karnataka',
    postal_code: '560001',
    country: 'India',
    latitude: 12.9716,
    longitude: 77.5946,
    size_sqft: 2500,
    price_monthly: 320000,
    availability_status: 'available',
    legal_requirements: 'Trade license and GST registration required.',
    amenities: ['WiFi', 'Parking', 'Security', '24/7 Access'],
    front_images: ['https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'],
    interior_images: [
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    ],
    is_approved: true,
    is_premium: false,
    is_featured: false,
    view_count: 201,
    enquiries_count: 9,
  },
  {
    title: 'Industrial Space in Gurgaon',
    description: 'Large industrial space of 20000 sq ft in Sector 18, Gurgaon. Suitable for manufacturing, warehousing, or distribution. Includes office space and loading facilities.',
    property_type: 'warehouse',
    address_line1: 'Sector 18, Industrial Area',
    address_line2: 'Near NH-8',
    city: 'Gurgaon',
    state: 'Haryana',
    postal_code: '122015',
    country: 'India',
    latitude: 28.4089,
    longitude: 77.0378,
    size_sqft: 20000,
    price_monthly: 400000,
    availability_status: 'available',
    legal_requirements: 'Factory license and pollution control certificate required.',
    amenities: ['Parking', 'Security', '24/7 Access', 'Loading Dock', 'Office Space'],
    front_images: ['https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg'],
    interior_images: [
      'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg',
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg',
    ],
    is_approved: true,
    is_premium: true,
    is_featured: true,
    view_count: 278,
    enquiries_count: 11,
  },
  {
    title: 'Office Space in Hitech City',
    description: 'Modern office space of 4000 sq ft in Hitech City, Hyderabad. Fully air-conditioned with modern interiors. Perfect for IT companies or corporate offices.',
    property_type: 'office',
    address_line1: 'Hitech City',
    address_line2: 'Near Cyber Towers',
    city: 'Hyderabad',
    state: 'Telangana',
    postal_code: '500081',
    country: 'India',
    latitude: 17.4486,
    longitude: 78.3908,
    size_sqft: 4000,
    price_monthly: 280000,
    availability_status: 'available',
    legal_requirements: 'Company registration required.',
    amenities: ['WiFi', 'Parking', 'Security', '24/7 Access', 'Cafeteria', 'Elevator', 'Power Backup'],
    front_images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'],
    interior_images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
    ],
    is_approved: true,
    is_premium: false,
    is_featured: false,
    view_count: 167,
    enquiries_count: 7,
  },
  {
    title: 'Retail Shop in Commercial Street',
    description: 'Prime retail shop of 1200 sq ft in Commercial Street, Bangalore. High footfall area, perfect for fashion, accessories, or lifestyle products.',
    property_type: 'retail',
    address_line1: 'Commercial Street',
    address_line2: 'Near Brigade Road',
    city: 'Bangalore',
    state: 'Karnataka',
    postal_code: '560001',
    country: 'India',
    latitude: 12.9716,
    longitude: 77.6101,
    size_sqft: 1200,
    price_monthly: 150000,
    availability_status: 'available',
    legal_requirements: 'Shop Act license required.',
    amenities: ['WiFi', 'Security'],
    front_images: ['https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'],
    interior_images: [
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    ],
    is_approved: true,
    is_premium: false,
    is_featured: false,
    view_count: 134,
    enquiries_count: 6,
  },
  {
    title: 'Premium Office in BKC',
    description: 'Luxury office space of 6000 sq ft in Bandra Kurla Complex, Mumbai. World-class amenities, premium location, perfect for multinational corporations.',
    property_type: 'office',
    address_line1: 'Bandra Kurla Complex',
    address_line2: 'Near MCA Club',
    city: 'Mumbai',
    state: 'Maharashtra',
    postal_code: '400051',
    country: 'India',
    latitude: 19.0645,
    longitude: 72.8709,
    size_sqft: 6000,
    price_monthly: 550000,
    availability_status: 'available',
    legal_requirements: 'Corporate registration and GST required.',
    amenities: ['WiFi', 'Parking', 'Security', '24/7 Access', 'Cafeteria', 'Elevator', 'Power Backup', 'Gym', 'Conference Rooms'],
    front_images: ['https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg'],
    interior_images: [
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg',
    ],
    is_approved: true,
    is_premium: true,
    is_featured: true,
    view_count: 389,
    enquiries_count: 18,
  },
  {
    title: 'Warehouse in Noida',
    description: 'Spacious warehouse of 12000 sq ft in Noida Sector 63. Well-connected location with easy access to Delhi NCR. Ideal for e-commerce fulfillment centers.',
    property_type: 'warehouse',
    address_line1: 'Sector 63, Noida',
    address_line2: 'Near Noida Expressway',
    city: 'Noida',
    state: 'Uttar Pradesh',
    postal_code: '201301',
    country: 'India',
    latitude: 28.5355,
    longitude: 77.3910,
    size_sqft: 12000,
    price_monthly: 220000,
    availability_status: 'available',
    legal_requirements: 'Trade license required.',
    amenities: ['Parking', 'Security', '24/7 Access', 'Loading Dock'],
    front_images: ['https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg'],
    interior_images: [
      'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg',
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg',
    ],
    is_approved: true,
    is_premium: false,
    is_featured: false,
    view_count: 145,
    enquiries_count: 4,
  },
  {
    title: 'Office Space in Banjara Hills',
    description: 'Elegant office space of 3500 sq ft in Banjara Hills, Hyderabad. Premium location with excellent infrastructure and connectivity.',
    property_type: 'office',
    address_line1: 'Road No. 12, Banjara Hills',
    address_line2: 'Near Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    postal_code: '500034',
    country: 'India',
    latitude: 17.4254,
    longitude: 78.4072,
    size_sqft: 3500,
    price_monthly: 260000,
    availability_status: 'available',
    legal_requirements: 'Business registration required.',
    amenities: ['WiFi', 'Parking', 'Security', '24/7 Access', 'Cafeteria', 'Elevator'],
    front_images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'],
    interior_images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
    ],
    is_approved: true,
    is_premium: true,
    is_featured: false,
    view_count: 198,
    enquiries_count: 10,
  },
  {
    title: 'Retail Space in Phoenix Mall',
    description: 'Prime retail space of 1800 sq ft in Phoenix Mall, Pune. High footfall location, perfect for branded retail outlets.',
    property_type: 'retail',
    address_line1: 'Phoenix Market City',
    address_line2: 'Viman Nagar',
    city: 'Pune',
    state: 'Maharashtra',
    postal_code: '411014',
    country: 'India',
    latitude: 18.5674,
    longitude: 73.9128,
    size_sqft: 1800,
    price_monthly: 280000,
    availability_status: 'available',
    legal_requirements: 'Mall agreement and trade license required.',
    amenities: ['WiFi', 'Parking', 'Security', '24/7 Access'],
    front_images: ['https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'],
    interior_images: [
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    ],
    is_approved: true,
    is_premium: false,
    is_featured: false,
    view_count: 176,
    enquiries_count: 8,
  },
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('Clearing existing data...');
    await UserProfile.deleteMany({ role: 'landlord' });
    await Property.deleteMany({});
    console.log('Cleared existing data');

    // Create landlords
    console.log('Creating landlords...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    const createdLandlords = [];

    for (const landlord of dummyLandlords) {
      const existing = await UserProfile.findOne({ email: landlord.email });
      if (!existing) {
        const newLandlord = await UserProfile.create({
          ...landlord,
          password_hash: hashedPassword,
        });
        createdLandlords.push(newLandlord);
        console.log(`Created landlord: ${landlord.full_name}`);
      } else {
        createdLandlords.push(existing);
        console.log(`Landlord already exists: ${landlord.full_name}`);
      }
    }

    // Create properties
    console.log('Creating properties...');
    let propertyIndex = 0;
    for (const property of dummyProperties) {
      const landlord = createdLandlords[propertyIndex % createdLandlords.length];
      const newProperty = await Property.create({
        ...property,
        landlordId: landlord._id,
      });
      console.log(`Created property: ${property.title}`);
      propertyIndex++;
    }

    console.log('✅ Database seeded successfully!');
    console.log(`Created ${createdLandlords.length} landlords`);
    console.log(`Created ${dummyProperties.length} properties`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedDatabase();
