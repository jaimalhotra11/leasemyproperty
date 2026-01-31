# Quick Start Guide - LeaseMyProperty

## 🚀 Website को Run करने के लिए

### Step 1: Dependencies Install करें
```bash
cd leasemyproperty
npm install
```

### Step 2: Environment Variables Setup करें
`leasemyproperty` folder में `.env.local` file बनाएं:

```env
MONGODB_URI=mongodb://localhost:27017/leasemyproperty
JWT_SECRET=your-secret-key-here
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

### Step 3: Development Server Start करें
```bash
npm run dev
```

Website `http://localhost:3000` पर available होगी!

## ✅ Website Features

### ✅ सभी Pages Working:
- ✅ Homepage (`/`) - Property search और featured listings
- ✅ Search Page (`/search`) - Advanced property search
- ✅ Property Detail (`/properties/[id]`) - Full property details
- ✅ Login/Register (`/auth/login`, `/auth/register`)
- ✅ Dashboard (`/dashboard`) - Role-based dashboards
- ✅ About, Blog, Careers, Help pages

### ✅ Backend APIs Working:
- ✅ Property CRUD operations
- ✅ Search and filtering
- ✅ User authentication
- ✅ Enquiry management
- ✅ Image uploads (Cloudinary)
- ✅ Admin approval system

### ✅ Error Handling:
- ✅ All API routes have try-catch blocks
- ✅ Input validation
- ✅ Proper error messages
- ✅ Database connection handling

## 🎯 Test करने के लिए:

1. **Homepage**: `http://localhost:3000` - सभी sections check करें
2. **Search**: `/search` - Filters test करें
3. **Register**: नया account बनाएं (Visitor या Landlord)
4. **Login**: Account से login करें
5. **Dashboard**: Role-based dashboard check करें
6. **Property Listing**: Landlord role से property add करें
7. **Enquiry**: Visitor role से enquiry submit करें

## 📝 Notes:

- MongoDB database चाहिए (local या MongoDB Atlas)
- Cloudinary account चाहिए image uploads के लिए
- JWT_SECRET एक strong random string होनी चाहिए

Website अब fully functional है! 🎉
