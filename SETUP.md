# LeaseMyProperty - Property Listing Platform Setup Guide

A professional property listing platform built with Next.js 13, Supabase, and TailwindCSS. Designed for commercial property rentals targeting big brands like banks, McDonald's, etc.

## Features

### User Roles
1. **Visitor** - Browse properties and send enquiries
2. **Landlord** - List and manage properties
3. **Admin** - Approve properties and manage enquiries

### Key Functionality
- Airbnb-style homepage with search and location filters
- Advanced property search with multiple filters
- Property detail pages with enquiry forms
- Role-based dashboards for all user types
- Secure authentication with Supabase
- Front images (hidden from renters) and interior images
- Admin approval workflow for properties and enquiries

## Prerequisites

- Node.js 18+ installed
- A Supabase account and project

## Setup Instructions

### 1. Supabase Configuration

1. Create a new project at [supabase.com](https://supabase.com)
2. The database schema has already been created via migrations
3. Get your project credentials:
   - Go to Project Settings > API
   - Copy the `Project URL` and `anon/public` key

### 2. Environment Variables

Update the `.env.local` file with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Database Schema

The platform uses the following tables:

### user_profiles
- Stores user information with roles (visitor/landlord/admin)
- Links to Supabase auth.users

### properties
- Property listings with all details
- Includes separate arrays for front_images and interior_images
- Requires admin approval (is_approved flag)

### enquiries
- Enquiries from visitors to properties
- Status tracking: pending → reviewing → forwarded → closed
- Admin can add notes before forwarding to landlords

## Creating the First Admin User

1. Sign up as a normal user
2. Go to your Supabase dashboard
3. Open the SQL Editor
4. Run this query (replace with your user's email):

```sql
UPDATE user_profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

## User Workflows

### Visitor Workflow
1. Sign up with company name
2. Browse properties using search and filters
3. View property details (interior images only)
4. Submit enquiry through form
5. Track enquiry status in dashboard

### Landlord Workflow
1. Sign up as landlord
2. List property with details and images
3. Property goes to admin for approval
4. View property status in dashboard
5. Receive forwarded enquiries from admin

### Admin Workflow
1. Review and approve new property listings
2. Review incoming enquiries
3. Forward approved enquiries to landlords
4. Manage all properties and enquiries

## Image Management

- **Front Images**: Not shown to visitors (stored but hidden)
- **Interior Images**: Displayed in listings and detail pages
- Uses Pexels stock photos or hosted image URLs
- Format: One URL per line in the form

Example Pexels URLs to use:
- `https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg`
- `https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg`
- `https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg`

## Design Features

- Minimal, clean design suitable for corporate clients
- Subtle animations and hover effects
- Responsive layout for all screen sizes
- Blue accent color scheme (professional)
- Clean typography with good contrast
- Smooth transitions throughout

## Security

- Row Level Security (RLS) enabled on all tables
- Role-based access control
- Users can only access their own data
- Admins have full access
- Front images hidden from non-landlords

## Build for Production

```bash
npm run build
npm run start
```

## Technology Stack

- **Framework**: Next.js 13 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: TailwindCSS
- **Language**: TypeScript

## Support

For issues or questions, please check:
1. Supabase connection in `.env.local`
2. Database migrations are applied
3. RLS policies are active
4. User roles are correctly assigned
