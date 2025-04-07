import { Route, Switch, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence, motion } from "framer-motion";
import HomePage from "./pages_jsx/HomePage";
import NotFound from "./pages/not-found";
import ServicesPage from "./pages_jsx/ServicesPage";
import ProductsPage from "./pages_jsx/ProductsPage";
import ProductDetailPage from "./pages_jsx/ProductDetailPage";
import AboutPage from "./pages_jsx/AboutPage";
import ContactPage from "./pages_jsx/ContactPage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import WhatsappButton from "./components/WhatsappButton";
import { pageTransition } from "./utils/animations";

function App() {
  const [location] = useLocation();

  // Create a PageWrapper component for animations
  const PageWrapper = ({ children }) => (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="w-full"
    >
      {children}
    </motion.div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
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
      <Toaster />
    </div>
  );
}

export default App;