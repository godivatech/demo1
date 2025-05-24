# One-Click Vercel Deployment

The Building Doctor website is set up for easy deployment to Vercel with a single click.

## How to Deploy

1. Click the button below to deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fbuilding-doctor-website&env=FIREBASE_API_KEY,FIREBASE_AUTH_DOMAIN,FIREBASE_DATABASE_URL,FIREBASE_PROJECT_ID,FIREBASE_STORAGE_BUCKET,FIREBASE_MESSAGING_SENDER_ID,FIREBASE_APP_ID,FIREBASE_MEASUREMENT_ID&project-name=building-doctor-website&repo-name=building-doctor-website)

2. When prompted, add the following environment variables:
   - `FIREBASE_API_KEY`: Your Firebase API key
   - `FIREBASE_AUTH_DOMAIN`: Your Firebase auth domain
   - `FIREBASE_DATABASE_URL`: Your Firebase database URL
   - `FIREBASE_PROJECT_ID`: Your Firebase project ID
   - `FIREBASE_STORAGE_BUCKET`: Your Firebase storage bucket
   - `FIREBASE_MESSAGING_SENDER_ID`: Your Firebase messaging sender ID
   - `FIREBASE_APP_ID`: Your Firebase app ID
   - `FIREBASE_MEASUREMENT_ID`: Your Firebase measurement ID

3. Click "Deploy" and wait for Vercel to build and deploy your application

## Setting up Firebase

If you don't already have a Firebase project, follow these steps:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and set up a new project
3. Once created, click on the web icon (</>) to add a web app
4. Register your app with a nickname (e.g., "Building Doctor Website")
5. Copy the Firebase configuration values provided and use them for your environment variables

## Custom Domains

After deployment, you can set up a custom domain through the Vercel dashboard:

1. Go to your project in the Vercel dashboard
2. Click on "Domains"
3. Add your custom domain and follow the instructions to set up DNS records

## Important Notes

- The project is configured to use Firebase Realtime Database for data storage
- The build process is set up to optimize assets for production
- All environment variables should be set to ensure proper functionality