import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/not-found";
import ServicesPage from "./pages/ServicesPage";
import ProductsPage from "./pages/ProductsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import WhatsappButton from "./components/WhatsappButton";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/services" component={ServicesPage} />
          <Route path="/products" component={ProductsPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <WhatsappButton />
      <Toaster />
    </div>
  );
}

export default App;
