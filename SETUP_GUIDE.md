# LeaseMyProperty - Setup Guide

## Prerequisites
- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)
- Cloudinary account (for image uploads)

## Installation Steps

### 1. Install Dependencies
```bash
cd leasemyproperty
npm install
```

### 2. Environment Variables Setup
Create a `.env.local` file in the `leasemyproperty` directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/leasemyproperty
# Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/leasemyproperty

# JWT Secret Key (Generate a strong random string)
# You can generate one using: openssl rand -base64 32
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Cloudinary Configuration (for image uploads)
# Get these from https://cloudinary.com/console
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Site URL (for server-side requests)
# Development: http://localhost:3000
# Production: https://yourdomain.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Node Environment
NODE_ENV=development
```

### 3. Run Development Server
```bash
npm run dev
```

The website will be available at `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
npm start
```

## Features

### User Roles
- **Visitor**: Can browse properties and submit enquiries
- **Landlord**: Can list properties and manage their listings
- **Admin**: Can approve properties and manage enquiries

### Key Pages
- `/` - Homepage with property search
- `/search` - Advanced property search
- `/properties/[id]` - Property detail page
- `/auth/login` - User login
- `/auth/register` - User registration
- `/dashboard` - Role-based dashboard
- `/properties/new` - List new property (Landlord only)

### API Endpoints
- `GET /api/properties` - Get all properties
- `GET /api/properties/search` - Search properties
- `GET /api/properties/[id]` - Get property by ID
- `POST /api/properties` - Create property (Landlord only)
- `POST /api/enquiries` - Submit enquiry (Visitor only)
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/upload` - Upload images (Landlord only)

## Troubleshooting

### Database Connection Issues
- Ensure MongoDB is running (if using local MongoDB)
- Check MONGODB_URI is correct
- Verify network connectivity for MongoDB Atlas

### Image Upload Issues
- Verify Cloudinary credentials are correct
- Check file size limits (max 5MB per image)
- Ensure file types are: jpeg, jpg, png, webp

### Authentication Issues
- Ensure JWT_SECRET is set
- Clear browser cookies if login fails
- Check that user role is correct in database

## Production Deployment

1. Set `NODE_ENV=production` in environment variables
2. Update `NEXT_PUBLIC_SITE_URL` to your production domain
3. Use secure MongoDB connection string
4. Generate a strong JWT_SECRET
5. Configure Cloudinary for production
6. Run `npm run build` to create optimized build
7. Deploy to Vercel, Netlify, or your preferred hosting platform

## Support
For issues or questions, check the help center at `/help` or contact support.
