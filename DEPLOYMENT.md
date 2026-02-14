# EduHub Deployment Guide

## Overview

EduHub can be deployed in two modes:

1. **Full Stack Mode** - With backend database and API
2. **Demo Mode** - Without database (mock data only)

## Demo Mode Deployment (No Database)

This mode is perfect for:
- Portfolio demonstrations
- Client-side only deployments
- Static hosting platforms (Vercel, Netlify, GitHub Pages)
- Testing without backend setup

### Quick Deploy (Recommended)

```bash
# 1. Navigate to client directory
cd client

# 2. Use deployment configuration
cp package.json.deployment package.json
cp .env.deployment .env.production

# 3. Build for production
npm run build

# 4. Deploy the build folder
# Deploy to Vercel, Netlify, or any static hosting
```

### Environment Variables for Demo Mode

Create `.env.production` with:

```env
REACT_APP_USE_MOCK_API=true
REACT_APP_DEMO_MODE=true
REACT_APP_SHOW_BANNER=true
```

### Deployment Platforms

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

#### GitHub Pages
```bash
# Build and deploy to gh-pages branch
npm run build
git add build/
git commit -m "Add build"
git subtree push --prefix build origin gh-pages
```

## Full Stack Mode Deployment

For production with database:

### Prerequisites
- Node.js 16+
- MongoDB or PostgreSQL
- Redis (for sessions)

### Environment Variables
```env
REACT_APP_API_URL=https://your-backend-url.com/api/v1
REACT_APP_USE_MOCK_API=false
```

### Backend Deployment
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Configure database
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
npm run db:migrate

# Start production server
npm start
```

## Features Available in Demo Mode

✅ **Fully Functional Frontend**
- User authentication (mock)
- Course browsing and enrollment
- Dashboard with progress tracking
- Responsive design (320px+)
- Dark mode support

✅ **Mock Data**
- 3 sample courses
- User profiles
- Progress tracking
- Forum discussions

✅ **Interactive Features**
- Course filtering and search
- Progress visualization
- Role-based dashboards
- Navigation and routing

## Limitations in Demo Mode

❌ **Backend Features**
- Real user registration
- Persistent data storage
- Email notifications
- Payment processing
- File uploads

❌ **Admin Features**
- User management
- Course creation
- Analytics
- System settings

## Customization

### Adding Your Own Courses

Edit `client/src/services/mockData.js`:

```javascript
export const mockCourses = [
  {
    id: 1,
    title: 'Your Course Title',
    slug: 'your-course-slug',
    short_description: 'Brief description',
    // ... other fields
  }
];
```

### Changing Demo Banner

Edit `client/src/components/Layout/Header.js` to modify the demo banner.

## Production Checklist

- [ ] Choose deployment mode (Demo vs Full Stack)
- [ ] Set environment variables
- [ ] Test all user flows
- [ ] Verify responsive design
- [ ] Check dark mode functionality
- [ ] Test role-based dashboards
- [ ] Validate all navigation links

## Support

For deployment issues:
1. Check environment variables
2. Verify build process
3. Test in development first
4. Check browser console for errors

## Demo Credentials

For testing the demo mode:
- **Student**: student@example.com / password123
- **Instructor**: instructor@example.com / password123  
- **Admin**: admin@example.com / admin123
