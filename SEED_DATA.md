# Seed Database with Dummy Data

## Quick Start

### Option 1: Using Admin Page (Recommended)
1. Start the development server: `npm run dev`
2. Open browser and go to: `http://localhost:3000/admin/seed`
3. Click "Seed Database" button
4. Wait for confirmation message

### Option 2: Using API Endpoint
```bash
curl -X POST http://localhost:3000/api/seed
```

## What Gets Added

### 6 Landlords
- Rajesh Kumar (Kumar Real Estate Group)
- Priya Sharma (Sharma Commercial Properties)
- Amit Patel (Patel Property Ventures)
- Sneha Reddy (Reddy Real Estate Solutions)
- Vikram Singh (Singh Property Holdings)
- Anita Desai (Desai Commercial Estates)

**Login Credentials:**
- Email: `rajesh.property@email.com` (or any other landlord email)
- Password: `password123`

### 12 Properties
Properties are distributed across major Indian cities:
- **Delhi**: Premium Office Space in Connaught Place
- **Mumbai**: Modern Retail Space in Bandra West, Premium Office in BKC
- **Bangalore**: Warehouse in Whitefield, Co-working Space in Koramangala, Showroom in MG Road, Retail Shop in Commercial Street
- **Hyderabad**: Office Space in Hitech City, Office Space in Banjara Hills
- **Gurgaon**: Industrial Space in Sector 18
- **Noida**: Warehouse in Sector 63
- **Pune**: Retail Space in Phoenix Mall

### Property Types
- Office Spaces (5)
- Retail Shops (3)
- Warehouses (3)
- Showroom (1)

### Features
- All properties are **pre-approved** and ready to view
- Properties include **realistic pricing** (₹1.5L - ₹5.5L per month)
- Properties have **multiple images**
- Properties include **amenities** and **legal requirements**
- Properties have **view counts** and **enquiry counts**
- Some properties are marked as **premium** and **featured**

## Market Insights
Market insights are automatically calculated based on the seeded properties:
- Average prices per city
- Price trends
- Demand scores
- Popular property types

## Notes
- Seeding will **NOT delete** existing data
- If a landlord with the same email exists, it will be reused
- Properties are distributed among landlords
- All properties are set to `available` status
