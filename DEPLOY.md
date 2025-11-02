# Deployment Instructions

## 📦 Preparing for GitHub Portfolio

1. **Create a new repository on GitHub** (e.g., `5chairs-statistics-portfolio`)

2. **Initialize and push code:**
```bash
git add .
git commit -m "Initial commit: 5Chairs Statistics Dashboard portfolio project"
git remote add origin <your-new-repo-url>
git branch -M main
git push -u origin main
```

## 🌐 Deploying to Netlify

### Option 1: Automatic Deploy (Recommended)

1. Go to [Netlify](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub account and select the repository
4. Netlify will automatically detect the settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"
6. Wait for the build to complete
7. Your site will be live at `https://your-site-name.netlify.app`

### Option 2: Manual Deploy

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `dist` folder to Netlify dashboard

## ✅ Pre-deployment Checklist

- [x] All mock data only (no real API calls)
- [x] No database dependencies
- [x] `netlify.toml` configured
- [x] `package.json` updated with correct name
- [x] README updated for portfolio
- [x] Build tested successfully
- [x] All environment variables removed (not needed)

## 📝 After Deployment

1. Update the README.md with your actual Netlify URL:
   ```markdown
   [View on Netlify](https://your-actual-url.netlify.app)
   ```

2. Add screenshots to the README (optional but recommended)

3. Add project to your portfolio!

## 🎯 Notes

- The project uses 100% mock data
- No backend required
- Perfect for portfolio demonstration
- Fully functional with all features working

