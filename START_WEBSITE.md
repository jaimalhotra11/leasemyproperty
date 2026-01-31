# 🚀 How to Start the Website

## Quick Start (3 Steps)

### Step 1: Open Terminal/PowerShell
Navigate to the project folder:
```bash
cd C:\Users\Aman\OneDrive\Desktop\leasemyprop\leasemyproperty
```

### Step 2: Install Dependencies (if not done)
```bash
npm install
```

### Step 3: Start the Server
```bash
npm run dev
```

**Website will be available at:** `http://localhost:3000`

---

## If Website Still Doesn't Work

### Check 1: Environment Variables
Make sure `.env.local` file exists in `leasemyproperty` folder with:
```env
MONGODB_URI=mongodb://localhost:27017/leasemyproperty
JWT_SECRET=your-secret-key-change-this
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

### Check 2: MongoDB Connection
- **Local MongoDB:** Make sure MongoDB service is running
- **MongoDB Atlas:** Update `MONGODB_URI` with your Atlas connection string

### Check 3: Port 3000
If port 3000 is busy:
```bash
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Check 4: Clear Cache
```bash
# Remove build cache
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Reinstall
npm install

# Start again
npm run dev
```

---

## Common Errors

### Error: "MONGODB_URI is not set"
**Fix:** Create `.env.local` file with `MONGODB_URI`

### Error: "Port 3000 already in use"
**Fix:** Kill the process or use different port: `npm run dev -- -p 3001`

### Error: "Cannot find module"
**Fix:** Run `npm install`

### Error: "MongoDB connection failed"
**Fix:** 
- Check if MongoDB is running
- Verify connection string
- For Atlas, check IP whitelist

---

## Still Not Working?

**Share these details:**
1. What error message you see in terminal?
2. What happens when you open `http://localhost:3000`?
3. Any errors in browser console (F12)?
