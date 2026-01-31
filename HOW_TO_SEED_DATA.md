# 🌱 How to Add Dummy Data

## Quick Method: Use Seed Page

**Easiest way to add dummy data:**

1. **Open your browser** and go to:
   ```
   http://localhost:3000/admin/seed
   ```

2. **Click "Seed Database" button**

3. **Wait for confirmation** - You'll see:
   - ✅ Successfully seeded 6 landlords and 12 properties!

4. **Refresh homepage** - You'll now see:
   - Properties on homepage
   - Recommended landlords
   - Market insights

---

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
Properties across major Indian cities:
- **Delhi**: Premium Office Space in Connaught Place
- **Mumbai**: Modern Retail Space in Bandra West, Premium Office in BKC
- **Bangalore**: Warehouse in Whitefield, Co-working Space in Koramangala, Showroom in MG Road, Retail Shop in Commercial Street
- **Hyderabad**: Office Space in Hitech City, Office Space in Banjara Hills
- **Gurgaon**: Industrial Space in Sector 18
- **Noida**: Warehouse in Sector 63
- **Pune**: Retail Space in Phoenix Mall

### Features
- ✅ All properties are **pre-approved** and ready to view
- ✅ Properties include **realistic pricing** (₹1.5L - ₹5.5L per month)
- ✅ Properties have **multiple images**
- ✅ Properties include **amenities** and **legal requirements**
- ✅ Properties have **view counts** and **enquiry counts**
- ✅ Some properties are marked as **premium** and **featured**

---

## Alternative: Use API Directly

If you prefer using the API:

```bash
# Using curl
curl -X POST http://localhost:3000/api/seed

# Or using PowerShell
Invoke-WebRequest -Uri "http://localhost:3000/api/seed" -Method POST
```

---

## Important Notes

### MongoDB Required
- **MongoDB must be running** for seeding to work
- If using local MongoDB, make sure the service is running
- If using MongoDB Atlas, check your connection string in `.env.local`

### Data Won't Be Deleted
- Seeding will **NOT delete** existing data
- If a landlord with the same email exists, it will be reused
- Properties are distributed among landlords

---

## After Seeding

1. **Homepage** - You'll see properties in "Best Properties Near You"
2. **Search Page** - All 12 properties will appear
3. **Recommended Landlords** - 6 landlords will be shown
4. **Market Insights** - Real data based on seeded properties

---

## Troubleshooting

### Error: "MongoDB connection failed"
**Fix:** 
- Check if MongoDB is running
- Verify `MONGODB_URI` in `.env.local`
- For Atlas, check IP whitelist

### Error: "Cannot POST /api/seed"
**Fix:**
- Make sure server is running (`npm run dev`)
- Check if the route exists

### No Data Appearing
**Fix:**
- Refresh the page (Ctrl + F5)
- Check browser console for errors
- Verify properties are approved (`is_approved: true`)

---

## ✅ Ready to Seed!

**Go to:** http://localhost:3000/admin/seed

**Click:** "Seed Database" button

**Done!** 🎉
