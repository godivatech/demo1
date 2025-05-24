# Building Doctor Website

A professional digital platform for OM Vinayaga Associates (Building Doctor franchise) that provides comprehensive construction repair services with an intuitive and modern user experience.

## One-Click Deployment

Deploy your own Building Doctor Website with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fbuilding-doctor-website&env=FIREBASE_API_KEY,FIREBASE_AUTH_DOMAIN,FIREBASE_DATABASE_URL,FIREBASE_PROJECT_ID,FIREBASE_STORAGE_BUCKET,FIREBASE_MESSAGING_SENDER_ID,FIREBASE_APP_ID,FIREBASE_MEASUREMENT_ID&project-name=building-doctor-website&framework=vite)

> **Note:** You'll need to provide your Firebase credentials during deployment. See the [Deployment Guide](./VERCEL_DEPLOYMENT_GUIDE.md) for detailed instructions.

## Features

- Complete business website with home, services, products, about, and contact pages
- Admin interface for content management
- Firebase Realtime Database integration
- Mobile-responsive design
- Interactive service and product galleries
- Before and after project showcases
- Testimonials and FAQs section
- WhatsApp integration for quick customer contact
- Animated page transitions for modern UX

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- NPM (v9 or higher)
- Firebase account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/building-doctor-website.git
cd building-doctor-website
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase credentials:

```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_DATABASE_URL=your_database_url
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. Start the development server:

```bash
npm run dev
```

## Deployment

For easy deployment, you can use Vercel:

1. Click the "Deploy to Vercel" button at the top of this README
2. Follow the instructions to deploy, entering your Firebase environment variables
3. For detailed instructions, see [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)

### Environment Variables for Deployment

The following environment variables are required for deployment:

```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_DATABASE_URL=your_database_url
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
```

You can copy these from your Firebase project settings.

## Technology Stack

- React.js frontend
- Express.js backend
- Firebase Realtime Database
- Tailwind CSS with shadcn UI components
- Framer Motion animations
- React Query for data fetching
- Zod for validation
- TypeScript for type safety

## License

This project is licensed under the MIT License.

## Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Firebase](https://firebase.google.com/) for backend services

/_ {
"variant": "professional",
"primary": "hsl(197, 97%, 63%)",
"appearance": "light",
"radius": 0.5
}
_/
primary: {
DEFAULT: "hsl(197, 97%, 63%)", // updated
foreground: "hsl(204, 10%, 98%)", // keep or tweak as needed
},
