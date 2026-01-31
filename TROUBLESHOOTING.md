# Troubleshooting Guide - Website Not Running

## Quick Fixes

### 1. Check if Node.js is installed
```bash
node --version
npm --version
```
Should show Node.js 18+ and npm 8+

### 2. Install Dependencies
```bash
cd leasemyproperty
npm install
```

### 3. Create Environment File
Create `.env.local` file in `leasemyproperty` folder:

```env
MONGODB_URI=mongodb://localhost:27017/leasemyproperty
JWT_SECRET=your-secret-key-change-this-in-production
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

### 4. Check MongoDB Connection
If using local MongoDB:
```bash
# Windows
net start MongoDB

# Or check if MongoDB is running
mongosh
```

If using MongoDB Atlas:
- Update `MONGODB_URI` in `.env.local` with your Atlas connection string

### 5. Clear Cache and Rebuild
```bash
# Remove build cache
rm -rf .next
# Or on Windows PowerShell:
Remove-Item -Recurse -Force .next

# Reinstall dependencies
npm install

# Start server
npm run dev
```

### 6. Check Port Availability
If port 3000 is already in use:
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in package.json
# "dev": "next dev -p 3001"
```

### 7. Check for TypeScript Errors
```bash
npm run build
```
This will show any compilation errors.

### 8. Check Console for Errors
Open browser console (F12) and check for:
- Network errors
- JavaScript errors
- API errors

## Common Errors and Solutions

### Error: "Cannot find module"
**Solution:** Run `npm install` again

### Error: "MongoDB connection failed"
**Solution:** 
- Check if MongoDB is running
- Verify `MONGODB_URI` in `.env.local`
- For Atlas, check IP whitelist

### Error: "Port 3000 already in use"
**Solution:**
- Kill the process using port 3000
- Or change port: `next dev -p 3001`

### Error: "Module not found: Can't resolve"
**Solution:**
- Delete `node_modules` and `.next` folders
- Run `npm install` again

### Error: "JWT_SECRET is required"
**Solution:**
- Add `JWT_SECRET` to `.env.local`
- Generate a random string: `openssl rand -base64 32`

## Step-by-Step Startup

1. **Navigate to project:**
   ```bash
   cd leasemyproperty
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env.local` file** (if not exists)

4. **Start MongoDB** (if using local)

5. **Start development server:**
   ```bash
   npm run dev
   ```

6. **Open browser:**
   ```
   http://localhost:3000
   ```

## Still Not Working?

1. Check terminal output for specific error messages
2. Check browser console (F12) for client-side errors
3. Verify all environment variables are set
4. Ensure MongoDB is accessible
5. Try clearing all caches:
   ```bash
   Remove-Item -Recurse -Force .next
   Remove-Item -Recurse -Force node_modules
   npm install
   npm run dev
   ```

## Need Help?

Share the exact error message from:
- Terminal output
- Browser console
- Network tab (if API errors)
