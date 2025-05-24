import { Route, Switch, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, lazy, useEffect } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import WhatsappButton from "./components/WhatsappButton";
import HomePageForm from "./components/HomePageForm";
import ExitIntentPopup from "./components/ExitIntentPopup";
import ChatBot from "./components/chat/ChatBot";
import { pageTransition } from "./utils/animations";

// Lazy load pages to improve initial load performance
const HomePage = lazy(() => import("./pages_jsx/HomePage.jsx"));
const NotFound = lazy(() => import("./pages/not-found.jsx"));
const ServicesPage = lazy(() => import("./pages_jsx/ServicesPage.jsx"));
const ProductsPage = lazy(() => import("./pages_jsx/ProductsPage.jsx"));
const ProductDetailPage = lazy(() => import("./pages_jsx/ProductDetailPage.jsx"));
const AboutPage = lazy(() => import("./pages_jsx/AboutPage.jsx"));
const ContactPage = lazy(() => import("./pages_jsx/ContactPage.jsx"));
const AdminPage = lazy(() => import("./pages_jsx/AdminPage.jsx"));

function App() {
  const [location] = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Create a PageWrapper component for animations
  const PageWrapper = ({ children }) => (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="w-full"
    >
      <Suspense fallback={<LoadingSpinner />}>
        {children}
      </Suspense>
    </motion.div>
  );

  // Custom branded loading animation
  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative">
        {/* Brand themed loader */}
        <div className="w-40 h-40 relative">
          {/* Outer spinning ring */}
          <div className="absolute inset-0 border-8 border-primary/10 border-t-primary border-r-primary/40 rounded-full animate-spin shadow-lg"></div>
          
          {/* Middle spinning ring - opposite direction */}
          <div className="absolute inset-3 border-6 border-primary/10 border-b-primary border-l-primary/40 rounded-full animate-spin-reverse"></div>
          
          {/* Inner static ring */}
          <div className="absolute inset-8 border-4 border-primary/20 rounded-full bg-white shadow-inner"></div>
          
          {/* Brand Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 flex flex-col items-center justify-center text-primary">
              <svg viewBox="0 0 24 24" className="w-10 h-10 mb-1" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path d="M9 22V12h6v10"></path>
              </svg>
              <span className="text-xs font-bold tracking-wider">BUILDING DOCTOR</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-primary/70 text-sm animate-pulse">Loading your experience...</div>
    </div>
  );

  // Show the popup form only on the homepage
  const showPopupForm = location === "/";

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full">
      <Header />
      <main className="flex-grow w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          <Switch key={location} location={location}>
            <Route path="/">
              <PageWrapper>
                <HomePage />
              </PageWrapper>
            </Route>
            <Route path="/services">
              <PageWrapper>
                <ServicesPage />
              </PageWrapper>
            </Route>
            <Route path="/products">
              <PageWrapper>
                <ProductsPage />
              </PageWrapper>
            </Route>
            <Route path="/products/:id">
              {(params) => (
                <PageWrapper>
                  <ProductDetailPage params={params} />
                </PageWrapper>
              )}
            </Route>
            <Route path="/about">
              <PageWrapper>
                <AboutPage />
              </PageWrapper>
            </Route>
            <Route path="/contact">
              <PageWrapper>
                <ContactPage />
              </PageWrapper>
            </Route>
            <Route path="/admin">
              <PageWrapper>
                <AdminPage />
              </PageWrapper>
            </Route>
            <Route>
              <PageWrapper>
                <NotFound />
              </PageWrapper>
            </Route>
          </Switch>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsappButton />
      {showPopupForm && <HomePageForm />}
      <ExitIntentPopup />
      <ChatBot />
      <Toaster />
    </div>
  );
}

export default App;