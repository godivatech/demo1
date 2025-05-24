# Vercel Deployment Guide for Building Doctor Website

This guide provides step-by-step instructions for deploying the Building Doctor Website to Vercel with a single click.

## One-Click Deployment

The easiest way to deploy is using the Deploy Button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fbuilding-doctor-website&env=FIREBASE_API_KEY,FIREBASE_AUTH_DOMAIN,FIREBASE_DATABASE_URL,FIREBASE_PROJECT_ID,FIREBASE_STORAGE_BUCKET,FIREBASE_MESSAGING_SENDER_ID,FIREBASE_APP_ID,FIREBASE_MEASUREMENT_ID&project-name=building-doctor-website&framework=vite)

## Step-by-Step Instructions

### 1. Click the "Deploy to Vercel" Button

This will take you to Vercel's deployment page where you can configure your deployment.

### 2. Connect Your GitHub/GitLab/Bitbucket Account

If you haven't connected your Git provider account, you'll be prompted to do so.

### 3. Configure the Repository

- Choose a name for your repository
- Set the project name (this will be used in your deployment URL)
- Select your personal account or team

### 4. Configure Environment Variables

You'll need to add all the Firebase configuration variables:

| Variable Name | Description | Example Value |
|---------------|-------------|--------------|
| FIREBASE_API_KEY | Your Firebase API key | AIzaSyC... |
| FIREBASE_AUTH_DOMAIN | Firebase auth domain | projectname.firebaseapp.com |
| FIREBASE_DATABASE_URL | Firebase database URL | https://projectname-default-rtdb.firebaseio.com |
| FIREBASE_PROJECT_ID | Firebase project ID | projectname |
| FIREBASE_STORAGE_BUCKET | Firebase storage bucket | projectname.appspot.com |
| FIREBASE_MESSAGING_SENDER_ID | Firebase messaging sender ID | 123456789012 |
| FIREBASE_APP_ID | Firebase app ID | 1:123456789012:web:abc123 |
| FIREBASE_MEASUREMENT_ID | Firebase measurement ID | G-ABCDEF1234 |

### 5. Click "Deploy"

Vercel will clone the repository, build the application, and deploy it to a `.vercel.app` domain.

### 6. Wait for the Build to Complete

This process may take a few minutes. You can monitor the build progress on the Vercel dashboard.

### 7. Visit Your Deployed Website

Once the build is complete, you can visit your website at the URL provided by Vercel.

## Custom Domain Setup (Optional)

To use a custom domain:

1. Go to your project in the Vercel dashboard
2. Click on "Domains"
3. Add your custom domain and follow the DNS setup instructions

## Troubleshooting

### Build Failing

If your build is failing, check the build logs for errors:

1. Go to your project in the Vercel dashboard
2. Click on "Deployments"
3. Select the failed deployment
4. Check the build logs for error messages

#### Common Build Issues

##### "No Output Directory found"
- Make sure the build process is creating files in the expected `dist` directory
- Check that the build script is executing correctly
- Deploy the project again after making the necessary fixes

##### "Cannot find module"
- This typically happens when there's a mismatch between ESM and CommonJS
- Try switching to the CommonJS version of the build script (which we've configured)
- Check for any syntax errors in the build scripts

### Client-Side Routing Issues

If you get 404 errors when accessing routes like `/admin`, `/products`, etc. directly:

1. Make sure the Vercel configuration is set up correctly to handle client-side routing
2. Check that your `vercel.json` file includes route configurations for all your application routes
3. Verify that the following files are included in your deployment:
   - `client/public/_redirects`
   - `client/public/static.json`
   - `client/public/vercel.json`

#### "Mixed Routing Properties" Error

If you encounter a "Mixed Routing Properties" error:

1. Make sure you're using either `routes` or `rewrites` consistently across all your vercel.json files, **not both**
2. Check both the root `vercel.json` and any `vercel.json` files in public directories
3. Use `routes` with `src` and `dest` properties (the older format) rather than `rewrites` with `source` and `destination`

We've configured the application to use only `routes` to avoid this issue, but if you modify the configuration, be careful not to mix routing formats.

#### General Troubleshooting

If you're still experiencing routing issues:

1. Try navigating to the main page first and then using the navigation links
2. Clear your browser cache
3. Check the browser console for any errors

### Firebase Connection Issues

If you're having issues connecting to Firebase:

1. Double-check all your environment variables in Vercel dashboard
2. Make sure your Firebase project has the Realtime Database enabled
3. Verify that your Firebase security rules allow the necessary read/write access
4. Try the following changes if experiencing issues:
   - Ensure Firebase config variables are properly escaped in Vercel
   - Check that Firebase rules allow access from your deployed domain
   - Verify CORS settings in Firebase if applicable

### Admin Panel White Screen Issues

If you encounter a white screen or error like "P.filter is not a function" in the Admin Panel after logging in:

1. This is caused by inconsistencies in how data is returned from API endpoints in the Vercel environment
2. We've created a special API handler (api/firebase-data.js) that ensures data is always returned in a consistent array format
3. The vercel.json configuration routes all data endpoints to this handler

If you still experience issues after deployment:

1. Check Vercel logs for any error messages
2. Verify that Firebase environment variables are correctly set in Vercel's environment settings
3. Make sure the proper routing is in place in vercel.json

### Need Additional Help?

If you continue to face issues, you can:

1. Create an issue in the GitHub repository
2. Contact the developer team for support

## Keeping Your Deployment Updated

When you make changes to your repository, Vercel will automatically rebuild and redeploy your website. To manually trigger a redeployment:

1. Go to your project in the Vercel dashboard
2. Click on "Deployments"
3. Click "Redeploy" on the most recent deployment