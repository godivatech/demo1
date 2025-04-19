import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { CSVLink } from "react-csv";
import { 
  Shield, Lock, LogOut, Users, ClipboardList, Package, PenTool,
  Search, Trash2, ChevronDown, ChevronUp, Eye, Edit, Plus, Star,
  MessageSquare, Phone, Calendar, Mail, Home, HelpCircle, Settings,
  FileText, Award, DollarSign, Image, MessageCircle, Layers, Save,
  BarChart2, AlertCircle, Briefcase, CheckCircle, Sliders, Gift, Video,
  Download, Filter, ArrowUpDown
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { COMPANY_NAME, PRODUCT_CATEGORIES } from "@/lib/constants";

// Admin credentials (hardcoded for simplicity - normally would be in a secure backend)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "buildingdoctor2023";

const AdminPage = () => {
  const [location, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItem, setExpandedItem] = useState(null);
  const [activeTab, setActiveTab] = useState("inquiries");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc"); // Default to newest first
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { toast } = useToast();

  // Check if user is already authenticated (from localStorage)
  useEffect(() => {
    const authStatus = localStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    
    if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("admin_authenticated", "true");
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard.",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  // Handle input change for login form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch all inquiries
  const {
    data: inquiries = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["inquiries"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/inquiries");
        return await res.json();
      } catch (error) {
        console.error("Failed to fetch inquiries:", error);
        return [];
      }
    },
    enabled: isAuthenticated,
  });

  // Fetch all exit intent form submissions
  const {
    data: intentSubmissions = [],
    isIntentsLoading,
    isIntentsError,
  } = useQuery({
    queryKey: ["intents"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/intents");
        return await res.json();
      } catch (error) {
        console.error("Failed to fetch intent submissions:", error);
        return [];
      }
    },
    enabled: isAuthenticated,
  });

  // Fetch all contact form submissions
  const {
    data: contactSubmissions = [],
    isLoading: isLoadingContacts,
    isError: isContactError,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/contacts");
        return await res.json();
      } catch (error) {
        console.error("Failed to fetch contact submissions:", error);
        return [];
      }
    },
    enabled: isAuthenticated,
  });
  
  // Fetch all products
  const {
    data: products = [],
    isLoading: isLoadingProducts,
    isError: isProductsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/products");
        return res.json().then(data => data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
      }
    },
    enabled: isAuthenticated,
  });
  
  // Fetch all services
  const {
    data: services = [],
    isLoading: isLoadingServices,
    isError: isServicesError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/services");
        return await res.json();
      } catch (error) {
        console.error("Failed to fetch services:", error);
        return [];
      }
    },
    enabled: isAuthenticated,
  });
  
  // Fetch all testimonials
  const {
    data: testimonials = [],
    isLoading: isLoadingTestimonials,
    isError: isTestimonialsError,
  } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/testimonials");
        return await res.json();
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        return [];
      }
    },
    enabled: isAuthenticated,
  });
  
  // Fetch all FAQs
  const {
    data: faqs = [],
    isLoading: isLoadingFaqs,
    isError: isFaqsError,
  } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/faqs");
        return await res.json();
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
        return [];
      }
    },
    enabled: isAuthenticated,
  });

  // Delete inquiry mutation
  const deleteInquiryMutation = useMutation({
    mutationFn: async (id) => {
      // If id is null or undefined, log error and return
      if (id === null || id === undefined) {
        console.error("Attempted to delete inquiry with null or undefined ID");
        throw new Error("Invalid inquiry ID");
      }
      
      // Ensure id is a number and not NaN
      const inquiryId = typeof id === 'string' && id.includes('-') 
        ? parseInt(id.split('-')[1])
        : parseInt(id);
        
      if (isNaN(inquiryId)) {
        console.error(`Invalid inquiry ID: ${id}`);
        throw new Error("Invalid inquiry ID");
      }
      
      const response = await apiRequest("DELETE", `/api/inquiries/${inquiryId}`);
      return { id: inquiryId, response };
    },
    onSuccess: (data) => {
      // Update cache immediately to reflect the deletion
      queryClient.setQueryData(["inquiries"], (oldData) => {
        // Filter out the deleted inquiry
        return oldData ? oldData.filter(inquiry => inquiry.id !== data.id) : [];
      });
      
      // Still invalidate to ensure consistency with server
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      
      toast({
        title: "Inquiry deleted",
        description: "The inquiry has been removed successfully.",
      });
    },
    onError: (error) => {
      console.error("Error deleting inquiry:", error);
      toast({
        title: "Failed to delete",
        description: "There was an error deleting the inquiry.",
        variant: "destructive",
      });
    },
  });

  // Delete contact submission mutation
  const deleteContactMutation = useMutation({
    mutationFn: async (id) => {
      // If id is null or undefined, log error and return
      if (id === null || id === undefined) {
        console.error("Attempted to delete contact with null or undefined ID");
        throw new Error("Invalid contact ID");
      }
      
      // Ensure id is a number and not NaN
      const contactId = typeof id === 'string' && id.includes('contact-') 
        ? parseInt(id.replace('contact-', ''))
        : parseInt(id);
        
      if (isNaN(contactId)) {
        console.error(`Invalid contact ID: ${id}`);
        throw new Error("Invalid contact ID");
      }
      
      const response = await apiRequest("DELETE", `/api/contacts/${contactId}`);
      return { id: contactId, response };
    },
    onSuccess: (data) => {
      // Update cache immediately to reflect the deletion
      queryClient.setQueryData(["contacts"], (oldData) => {
        // Filter out the deleted contact
        return oldData ? oldData.filter(contact => contact.id !== data.id) : [];
      });
      
      // Still invalidate to ensure consistency with server
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      
      toast({
        title: "Contact submission deleted",
        description: "The contact form submission has been removed successfully.",
      });
    },
    onError: (error) => {
      console.error("Error deleting contact:", error);
      toast({
        title: "Failed to delete",
        description: "There was an error deleting the contact submission.",
        variant: "destructive",
      });
    },
  });
  
  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: async (id) => {
      await apiRequest("DELETE", `/api/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Product deleted",
        description: "The product has been removed successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Failed to delete",
        description: "There was an error deleting the product.",
        variant: "destructive",
      });
    },
  });
  
  // Delete service mutation
  const deleteServiceMutation = useMutation({
    mutationFn: async (id) => {
      await apiRequest("DELETE", `/api/services/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({
        title: "Service deleted",
        description: "The service has been removed successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Failed to delete",
        description: "There was an error deleting the service.",
        variant: "destructive",
      });
    },
  });
  
  // Delete testimonial mutation
  const deleteTestimonialMutation = useMutation({
    mutationFn: async (id) => {
      await apiRequest("DELETE", `/api/testimonials/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast({
        title: "Testimonial deleted",
        description: "The testimonial has been removed successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Failed to delete",
        description: "There was an error deleting the testimonial.",
        variant: "destructive",
      });
    },
  });
  
  // Delete FAQ mutation
  const deleteFaqMutation = useMutation({
    mutationFn: async (id) => {
      await apiRequest("DELETE", `/api/faqs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      toast({
        title: "FAQ deleted",
        description: "The FAQ has been removed successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Failed to delete",
        description: "There was an error deleting the FAQ.",
        variant: "destructive",
      });
    },
  });
  
  // Delete intent form submission mutation
  const deleteIntentMutation = useMutation({
    mutationFn: async (id) => {
      // If id is null or undefined, log error and return
      if (id === null || id === undefined) {
        console.error("Attempted to delete intent with null or undefined ID");
        throw new Error("Invalid intent ID");
      }
      
      // Ensure id is a number and not NaN
      const intentId = typeof id === 'string' && id.includes('intent-') 
        ? parseInt(id.replace('intent-', ''))
        : parseInt(id);
        
      if (isNaN(intentId)) {
        console.error(`Invalid intent ID: ${id}`);
        throw new Error("Invalid intent ID");
      }
      
      const response = await apiRequest("DELETE", `/api/intents/${intentId}`);
      return { id: intentId, response };
    },
    onSuccess: (data) => {
      // Update cache immediately to reflect the deletion
      queryClient.setQueryData(["intents"], (oldData) => {
        // Filter out the deleted intent
        return oldData ? oldData.filter(intent => intent.id !== data.id) : [];
      });
      
      // Still invalidate to ensure consistency with server
      queryClient.invalidateQueries({ queryKey: ["intents"] });
      
      toast({
        title: "Intent form submission deleted",
        description: "The exit intent form submission has been removed successfully.",
      });
    },
    onError: (error) => {
      console.error("Error deleting intent:", error);
      toast({
        title: "Failed to delete",
        description: "There was an error deleting the intent form submission.",
        variant: "destructive",
      });
    },
  });

  // Filter inquiries based on search term
  const filteredInquiries = inquiries.filter((inquiry) => {
    const searchable = `${inquiry.name} ${inquiry.phone} ${inquiry.email} ${inquiry.issueType} ${inquiry.message} ${inquiry.address}`.toLowerCase();
    return searchable.includes(searchTerm.toLowerCase());
  });

  // Filter intent form submissions based on search term
  const filteredIntents = intentSubmissions.filter((intent) => {
    const searchable = `${intent.name} ${intent.phone} ${intent.service} ${intent.message}`.toLowerCase();
    return searchable.includes(searchTerm.toLowerCase());
  });

  // Filter contact submissions based on search term
  const filteredContacts = contactSubmissions.filter((contact) => {
    const searchable = `${contact.name} ${contact.phone} ${contact.email} ${contact.service} ${contact.message}`.toLowerCase();
    return searchable.includes(searchTerm.toLowerCase());
  });
  
  // Filter products based on search term
  const filteredProducts = products.filter((product) => {
    const searchable = `${product.name} ${product.description} ${product.category}`.toLowerCase();
    return searchable.includes(searchTerm.toLowerCase());
  });
  
  // Filter services based on search term
  const filteredServices = services.filter((service) => {
    const searchable = `${service.title} ${service.description} ${service.features?.join(' ')}`.toLowerCase();
    return searchable.includes(searchTerm.toLowerCase());
  });
  
  // Filter testimonials based on search term
  const filteredTestimonials = testimonials.filter((testimonial) => {
    const searchable = `${testimonial.name} ${testimonial.location} ${testimonial.content}`.toLowerCase();
    return searchable.includes(searchTerm.toLowerCase());
  });
  
  // Filter FAQs based on search term
  const filteredFaqs = faqs.filter((faq) => {
    const searchable = `${faq.question} ${faq.answer}`.toLowerCase();
    return searchable.includes(searchTerm.toLowerCase());
  });

  // Toggle expanded item with type prefix
  const toggleExpand = (id, type = 'general') => {
    // If the id already includes a type prefix (e.g., 'contact-123'), use it as is
    // Otherwise, add the specified type as a prefix
    const formattedId = id.toString().includes('-') ? id : `${type}-${id}`;
    setExpandedItem(expandedItem === formattedId ? null : formattedId);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Format date for input fields
  const formatDateForInput = (date) => {
    return date ? new Date(date).toISOString().split('T')[0] : "";
  };
  
  // Get paginated data
  const getPaginatedData = (data) => {
    // Calculate pagination indexes
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Reset to first page when filtering changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, startDate, endDate]);
  
  // Filter data by date range
  const filterByDateRange = (data, startDate, endDate) => {
    if (!startDate && !endDate) return data;
    
    return data.filter(item => {
      const itemDate = new Date(item.createdAt);
      
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        // Set end date to end of day
        end.setHours(23, 59, 59, 999);
        return itemDate >= start && itemDate <= end;
      } else if (startDate) {
        const start = new Date(startDate);
        return itemDate >= start;
      } else if (endDate) {
        const end = new Date(endDate);
        // Set end date to end of day
        end.setHours(23, 59, 59, 999);
        return itemDate <= end;
      }
      
      return true;
    });
  };
  
  // Sort data by created date
  const sortByDate = (data, order = "desc") => {
    // Make sure data is an array before attempting to sort
    if (!data || !Array.isArray(data)) {
      console.error("sortByDate received invalid data:", data);
      return [];
    }
    
    return [...data].sort((a, b) => {
      // Handle null or undefined createdAt
      const dateA = a && a.createdAt ? new Date(a.createdAt) : new Date(0);
      const dateB = b && b.createdAt ? new Date(b.createdAt) : new Date(0);
      
      return order === "desc" 
        ? dateB - dateA // newest first
        : dateA - dateB; // oldest first
    });
  };
  
  // Pagination component
  const Pagination = ({ totalItems }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    const handlePrevPage = () => {
      setCurrentPage(prev => Math.max(prev - 1, 1));
    };
    
    const handleNextPage = () => {
      setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };
    
    // Only show pagination if there are multiple pages
    if (totalPages <= 1) return null;
    
    return (
      <div className="flex justify-center items-center mt-6 space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handlePrevPage} 
          disabled={currentPage === 1}
          className="flex items-center gap-1"
        >
          <ChevronDown className="h-4 w-4 rotate-90" />
          Previous
        </Button>
        
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">Page</span>
          <span className="px-3 py-1 bg-gray-100 rounded-md text-sm font-medium">
            {currentPage} of {totalPages}
          </span>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
          className="flex items-center gap-1"
        >
          Next
          <ChevronDown className="h-4 w-4 -rotate-90" />
        </Button>
        
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => {
            setItemsPerPage(Number(value));
            setCurrentPage(1); // Reset to first page when changing items per page
          }}
        >
          <SelectTrigger className="w-[110px] h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 per page</SelectItem>
            <SelectItem value="10">10 per page</SelectItem>
            <SelectItem value="25">25 per page</SelectItem>
            <SelectItem value="50">50 per page</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-slate-50 pt-28 pb-12">
        <div className="container max-w-md mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
          >
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Admin Login</h1>
            <p className="text-center text-gray-600 mb-8">
              {COMPANY_NAME} Admin Dashboard
            </p>
            
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="pl-10"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="pl-10"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full mt-6 bg-orange-600 hover:bg-orange-700">
                Login
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <Link href="/">
                <Button
                  variant="link"
                  className="text-gray-600 hover:text-orange-600"
                >
                  Return to Homepage
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">Manage inquiries and contact submissions</p>
          </div>
          
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search by name, phone, email or issue..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Date Filter
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Filter by Date Range</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="start-date">Start Date</Label>
                          <Input 
                            id="start-date" 
                            type="date" 
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end-date">End Date</Label>
                          <Input 
                            id="end-date" 
                            type="date" 
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setStartDate("");
                          setEndDate("");
                        }}
                      >
                        Clear
                      </Button>
                      <Button 
                        onClick={() => setIsFilterDialogOpen(false)}
                      >
                        Apply Filter
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Button
                  variant="outline"
                  onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                  className="flex items-center gap-2"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  {sortOrder === "desc" ? "Newest First" : "Oldest First"}
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="inquiries">
              <TabsList className="grid w-full grid-cols-7 mb-6">
                <TabsTrigger value="inquiries" className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 text-white group-hover:text-black transition-colors" />
                  Inquiries
                </TabsTrigger>
                <TabsTrigger value="contacts" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-white group-hover:text-black transition-colors" />
                  Contacts
                </TabsTrigger>
                <TabsTrigger value="intents" className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-white group-hover:text-black transition-colors" />
                  Exit Intent
                </TabsTrigger>
                <TabsTrigger value="products" className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-white group-hover:text-black transition-colors" />
                  Products
                </TabsTrigger>
                <TabsTrigger value="services" className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-white group-hover:text-black transition-colors" />
                  Services
                </TabsTrigger>
                <TabsTrigger value="testimonials" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-white group-hover:text-black transition-colors" />
                  Testimonials
                </TabsTrigger>
                <TabsTrigger value="faqs" className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-white group-hover:text-black transition-colors" />
                  FAQs
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="inquiries">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Inquiries</h2>
                  
                  {!isLoading && !isError && filteredInquiries.length > 0 && (
                    <CSVLink 
                      data={filterByDateRange(filteredInquiries, startDate, endDate).map(inquiry => ({
                        ID: inquiry.id,
                        Name: inquiry.name,
                        Phone: inquiry.phone,
                        Email: inquiry.email || '',
                        'Issue Type': inquiry.issueType || 'General Inquiry',
                        Message: inquiry.message || '',
                        Address: inquiry.address || '',
                        'Created At': inquiry.createdAt ? formatDate(inquiry.createdAt) : ''
                      }))}
                      filename={`inquiries-${startDate || 'all'}-to-${endDate || 'all'}.csv`}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      <Download className="h-4 w-4" />
                      Export CSV
                    </CSVLink>
                  )}
                </div>
                
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-400 border-r-transparent"></div>
                    <p className="mt-2 text-gray-600">Loading inquiries...</p>
                  </div>
                ) : isError ? (
                  <div className="text-center py-12 text-red-600">
                    Error loading inquiries. Please try again.
                  </div>
                ) : filteredInquiries.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    {searchTerm ? "No inquiries match your search." : "No inquiries yet."}
                  </div>
                ) : (
                  <div className="overflow-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
                          <th className="border border-gray-200 px-4 py-2 text-left">Phone</th>
                          <th className="border border-gray-200 px-4 py-2 text-left">Issue Type</th>
                          <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
                          <th className="border border-gray-200 px-4 py-2 text-left">Date</th>
                          <th className="border border-gray-200 px-4 py-2 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getPaginatedData(sortByDate(filterByDateRange(filteredInquiries, startDate, endDate), sortOrder)).map((inquiry) => (
                          <tr key={inquiry.id} className="hover:bg-gray-50">
                            <td className="border border-gray-200 px-4 py-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="font-semibold text-orange-600 text-xs">
                                    {inquiry.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <span>{inquiry.name}</span>
                              </div>
                            </td>
                            <td className="border border-gray-200 px-4 py-2">{inquiry.phone}</td>
                            <td className="border border-gray-200 px-4 py-2">
                              <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                                {inquiry.issueType || "General Inquiry"}
                              </span>
                            </td>
                            <td className="border border-gray-200 px-4 py-2">{inquiry.email || "-"}</td>
                            <td className="border border-gray-200 px-4 py-2 text-sm">
                              {inquiry.createdAt ? formatDate(inquiry.createdAt) : "Recent"}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                              <div className="flex justify-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => toggleExpand(inquiry.id)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-red-600 border-red-200 hover:bg-red-50"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you sure you want to delete this inquiry?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the inquiry 
                                        from {COMPANY_NAME}'s database.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction 
                                        onClick={() => deleteInquiryMutation.mutate(inquiry.id)}
                                        className="bg-red-600 text-white hover:bg-red-700"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    {/* Add pagination component */}
                    <Pagination totalItems={sortByDate(filterByDateRange(filteredInquiries, startDate, endDate), sortOrder).length} />
                  </div>
                )}
                
                {expandedItem && (
                  <Dialog open={expandedItem !== null} onOpenChange={(open) => !open && setExpandedItem(null)}>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Inquiry Details</DialogTitle>
                      </DialogHeader>
                      
                      {inquiries.find(i => i.id === expandedItem) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                          <div>
                            <h3 className="font-semibold mb-2">Contact Information</h3>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Name:</span>
                                <span>{inquiries.find(i => i.id === expandedItem).name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Phone:</span>
                                <span>{inquiries.find(i => i.id === expandedItem).phone}</span>
                              </div>
                              {inquiries.find(i => i.id === expandedItem).email && (
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">Email:</span>
                                  <span>{inquiries.find(i => i.id === expandedItem).email}</span>
                                </div>
                              )}
                              {inquiries.find(i => i.id === expandedItem).address && (
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">Address:</span>
                                  <span>{inquiries.find(i => i.id === expandedItem).address}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold mb-2">Inquiry Details</h3>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Issue Type:</span>
                                <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                                  {inquiries.find(i => i.id === expandedItem).issueType || "General Inquiry"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Submitted:</span>
                                <span>
                                  {inquiries.find(i => i.id === expandedItem).createdAt 
                                    ? formatDate(inquiries.find(i => i.id === expandedItem).createdAt) 
                                    : "Recent"}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {inquiries.find(i => i.id === expandedItem).message && (
                            <div className="col-span-1 md:col-span-2">
                              <h3 className="font-semibold mb-2">Message</h3>
                              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                {inquiries.find(i => i.id === expandedItem).message}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <DialogFooter>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            const id = expandedItem;
                            setExpandedItem(null);
                            deleteInquiryMutation.mutate(id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setExpandedItem(null)}
                        >
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </TabsContent>
              
              <TabsContent value="products">
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Products Management</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-orange-600 hover:bg-orange-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input id="name" placeholder="e.g. Waterproofing Solution" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="price">Price (₹)</Label>
                            <Input id="price" type="number" placeholder="2499" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select>
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {PRODUCT_CATEGORIES.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="image">Image URL</Label>
                          <Input id="image" placeholder="https://example.com/image.jpg" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" placeholder="Describe the product..." className="min-h-[100px]" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="is-bestseller" />
                            <Label htmlFor="is-bestseller">Bestseller</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="is-new" />
                            <Label htmlFor="is-new">New Product</Label>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline">Cancel</Button>
                        <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                          <Save className="h-4 w-4 mr-2" />
                          Save Product
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {isLoadingProducts ? (
                  <div className="text-center py-12">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-400 border-r-transparent"></div>
                    <p className="mt-2 text-gray-600">Loading products...</p>
                  </div>
                ) : isProductsError ? (
                  <div className="text-center py-12 text-red-600">
                    Error loading products. Please try again.
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    {searchTerm ? "No products match your search." : "No products yet."}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card>
                          <CardHeader className="p-4 pb-2">
                            <div className="flex justify-between">
                              <CardTitle className="text-lg font-semibold truncate">
                                {product.name}
                              </CardTitle>
                              <div className="flex space-x-1">
                                {product.isBestseller && (
                                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                                    <Star className="h-3 w-3 mr-1" />
                                    Bestseller
                                  </Badge>
                                )}
                                {product.isNew && (
                                  <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                                    New
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <CardDescription className="text-gray-500">
                              {product.category}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="relative h-40 mb-3 bg-gray-100 rounded-md overflow-hidden">
                              {product.image ? (
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full bg-gray-200">
                                  <Image className="h-12 w-12 text-gray-400" />
                                </div>
                              )}
                              <div className="absolute top-2 right-2 bg-white py-1 px-2 rounded-full font-semibold text-sm">
                                ₹{product.price}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                              {product.description}
                            </p>
                            <div className="flex items-center text-sm text-yellow-600">
                              {Array(5).fill(0).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < product.rating ? 'fill-yellow-500' : 'text-gray-300'}`}
                                />
                              ))}
                              <span className="ml-1 text-gray-600">({product.rating})</span>
                            </div>
                          </CardContent>
                          <CardFooter className="p-4 pt-0 flex justify-between">
                            <Button variant="outline" size="sm" className="text-gray-600">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <div className="space-x-2">
                              <Button variant="outline" size="sm" className="text-blue-600">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600"
                                onClick={() => deleteProductMutation.mutate(product.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="intents">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Exit Intent Form Submissions</h2>
                  
                  {!isIntentsLoading && !isIntentsError && filteredIntents.length > 0 && (
                    <CSVLink 
                      data={filterByDateRange(filteredIntents, startDate, endDate).map(intent => ({
                        ID: intent.id,
                        Name: intent.name,
                        Phone: intent.phone,
                        Service: intent.service || '',
                        Message: intent.message || '',
                        'Created At': intent.createdAt ? formatDate(intent.createdAt) : ''
                      }))}
                      filename={`exit-intents-${startDate || 'all'}-to-${endDate || 'all'}.csv`}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      <Download className="h-4 w-4" />
                      Export CSV
                    </CSVLink>
                  )}
                </div>
                
                {isIntentsLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-400 border-r-transparent"></div>
                    <p className="mt-2 text-gray-600">Loading exit intent form submissions...</p>
                  </div>
                ) : isIntentsError ? (
                  <div className="text-center py-12 text-red-600">
                    Error loading exit intent form submissions. Please try again.
                  </div>
                ) : filteredIntents.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    {searchTerm ? "No exit intent form submissions match your search." : "No exit intent form submissions yet."}
                  </div>
                ) : (
                  <div className="overflow-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
                          <th className="border border-gray-200 px-4 py-2 text-left">Phone</th>
                          <th className="border border-gray-200 px-4 py-2 text-left">Service</th>
                          <th className="border border-gray-200 px-4 py-2 text-left">Date</th>
                          <th className="border border-gray-200 px-4 py-2 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getPaginatedData(sortByDate(filterByDateRange(filteredIntents, startDate, endDate), sortOrder)).map((intent) => (
                          <tr key={intent.id} className="hover:bg-gray-50">
                            <td className="border border-gray-200 px-4 py-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="font-semibold text-red-600 text-xs">
                                    {intent.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <span>{intent.name}</span>
                              </div>
                            </td>
                            <td className="border border-gray-200 px-4 py-2">{intent.phone}</td>
                            <td className="border border-gray-200 px-4 py-2">
                              <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                {intent.service || "Urgent Consultation"}
                              </span>
                            </td>
                            <td className="border border-gray-200 px-4 py-2 text-sm">
                              {intent.createdAt ? formatDate(intent.createdAt) : "Recent"}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                              <div className="flex justify-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => toggleExpand(intent.id, 'intent')}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-red-600 border-red-200 hover:bg-red-50"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you sure you want to delete this intent form?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the exit intent form 
                                        from {COMPANY_NAME}'s database.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction 
                                        onClick={() => deleteIntentMutation.mutate(intent.id)}
                                        className="bg-red-600 text-white hover:bg-red-700"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    {/* Add pagination component */}
                    <Pagination totalItems={sortByDate(filterByDateRange(filteredIntents, startDate, endDate), sortOrder).length} />
                  </div>
                )}
                
                {expandedItem && expandedItem.startsWith('intent-') && (
                  <Dialog open={expandedItem !== null && expandedItem.startsWith('intent-')} onOpenChange={(open) => !open && setExpandedItem(null)}>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Exit Intent Form Details</DialogTitle>
                      </DialogHeader>
                      
                      {intentSubmissions.find(i => `intent-${i.id}` === expandedItem) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                          <div>
                            <h3 className="font-semibold mb-2">Contact Information</h3>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Name:</span>
                                <span>{intentSubmissions.find(i => `intent-${i.id}` === expandedItem).name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Phone:</span>
                                <span>{intentSubmissions.find(i => `intent-${i.id}` === expandedItem).phone}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold mb-2">Form Details</h3>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Service:</span>
                                <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                  {intentSubmissions.find(i => `intent-${i.id}` === expandedItem).service || "Urgent Consultation"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Submitted:</span>
                                <span>
                                  {intentSubmissions.find(i => `intent-${i.id}` === expandedItem).createdAt 
                                    ? formatDate(intentSubmissions.find(i => `intent-${i.id}` === expandedItem).createdAt) 
                                    : "Recent"}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {intentSubmissions.find(i => `intent-${i.id}` === expandedItem).message && (
                            <div className="col-span-1 md:col-span-2">
                              <h3 className="font-semibold mb-2">Message</h3>
                              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                {intentSubmissions.find(i => `intent-${i.id}` === expandedItem).message}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <DialogFooter>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            const id = parseInt(expandedItem.replace('intent-', ''));
                            setExpandedItem(null);
                            deleteIntentMutation.mutate(id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setExpandedItem(null)}
                        >
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </TabsContent>
              
              <TabsContent value="contacts">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Contact Submissions</h2>
                  
                  {!isLoadingContacts && !isContactError && filteredContacts.length > 0 && (
                    <CSVLink 
                      data={filterByDateRange(filteredContacts, startDate, endDate).map(contact => ({
                        ID: contact.id,
                        Name: contact.name,
                        Phone: contact.phone,
                        Email: contact.email || '',
                        Service: contact.service || 'General',
                        Message: contact.message || '',
                        Consent: contact.consent ? 'Yes' : 'No',
                        'Created At': contact.createdAt ? formatDate(contact.createdAt) : ''
                      }))}
                      filename={`contacts-${startDate || 'all'}-to-${endDate || 'all'}.csv`}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      <Download className="h-4 w-4" />
                      Export CSV
                    </CSVLink>
                  )}
                </div>
                
                {isLoadingContacts ? (
                  <div className="text-center py-12">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-400 border-r-transparent"></div>
                    <p className="mt-2 text-gray-600">Loading contact submissions...</p>
                  </div>
                ) : isContactError ? (
                  <div className="text-center py-12 text-red-600">
                    Error loading contact submissions. Please try again.
                  </div>
                ) : filteredContacts.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    {searchTerm ? "No contacts match your search." : "No contact form submissions yet."}
                  </div>
                ) : (
                  <div className="overflow-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
                          <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
                          <th className="border border-gray-200 px-4 py-2 text-left">Phone</th>
                          <th className="border border-gray-200 px-4 py-2 text-left">Service</th>
                          <th className="border border-gray-200 px-4 py-2 text-left">Date</th>
                          <th className="border border-gray-200 px-4 py-2 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getPaginatedData(sortByDate(filterByDateRange(filteredContacts, startDate, endDate), sortOrder)).map((contact) => (
                          <tr key={contact.id} className="hover:bg-gray-50">
                            <td className="border border-gray-200 px-4 py-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="font-semibold text-blue-600 text-xs">
                                    {contact.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <span>{contact.name}</span>
                              </div>
                            </td>
                            <td className="border border-gray-200 px-4 py-2">{contact.email}</td>
                            <td className="border border-gray-200 px-4 py-2">{contact.phone}</td>
                            <td className="border border-gray-200 px-4 py-2">
                              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                {contact.service || "Contact Request"}
                              </span>
                            </td>
                            <td className="border border-gray-200 px-4 py-2 text-sm">
                              {contact.createdAt ? formatDate(contact.createdAt) : "Recent"}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                              <div className="flex justify-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => toggleExpand(`contact-${contact.id}`)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-red-600 border-red-200 hover:bg-red-50"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you sure you want to delete this contact?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the contact form 
                                        from {COMPANY_NAME}'s database.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction 
                                        onClick={() => deleteContactMutation.mutate(contact.id)}
                                        className="bg-red-600 text-white hover:bg-red-700"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {expandedItem && expandedItem.startsWith('contact-') && (
                  <Dialog 
                    open={expandedItem !== null && expandedItem.startsWith('contact-')} 
                    onOpenChange={(open) => !open && setExpandedItem(null)}
                  >
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Contact Submission Details</DialogTitle>
                      </DialogHeader>
                      
                      {contactSubmissions.find(c => `contact-${c.id}` === expandedItem) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                          <div>
                            <h3 className="font-semibold mb-2">Contact Information</h3>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Name:</span>
                                <span>{contactSubmissions.find(c => `contact-${c.id}` === expandedItem).name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Phone:</span>
                                <span>{contactSubmissions.find(c => `contact-${c.id}` === expandedItem).phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Email:</span>
                                <span>{contactSubmissions.find(c => `contact-${c.id}` === expandedItem).email}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold mb-2">Submission Details</h3>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Service:</span>
                                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                  {contactSubmissions.find(c => `contact-${c.id}` === expandedItem).service || "Contact Request"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Submitted:</span>
                                <span>
                                  {contactSubmissions.find(c => `contact-${c.id}` === expandedItem).createdAt 
                                    ? formatDate(contactSubmissions.find(c => `contact-${c.id}` === expandedItem).createdAt) 
                                    : "Recent"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Consent:</span>
                                <span>
                                  {contactSubmissions.find(c => `contact-${c.id}` === expandedItem).consent ? "Yes" : "No"}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {contactSubmissions.find(c => `contact-${c.id}` === expandedItem).message && (
                            <div className="col-span-1 md:col-span-2">
                              <h3 className="font-semibold mb-2">Message</h3>
                              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                {contactSubmissions.find(c => `contact-${c.id}` === expandedItem).message}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <DialogFooter>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            const id = parseInt(expandedItem.replace('contact-', ''));
                            setExpandedItem(null);
                            deleteContactMutation.mutate(id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setExpandedItem(null)}
                        >
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </TabsContent>
              
              <TabsContent value="services">
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Services Management</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-orange-600 hover:bg-orange-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Service
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Service</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Service Title</Label>
                          <Input id="title" placeholder="e.g. Waterproofing Services" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="image">Image URL</Label>
                          <Input id="image" placeholder="https://example.com/image.jpg" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" placeholder="Describe the service..." className="min-h-[100px]" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="features">Features (one per line)</Label>
                          <Textarea id="features" placeholder="Free inspection&#10;Quality materials&#10;5-year warranty" className="min-h-[100px]" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline">Cancel</Button>
                        <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                          <Save className="h-4 w-4 mr-2" />
                          Save Service
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {isLoadingServices ? (
                  <div className="text-center py-12">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-400 border-r-transparent"></div>
                    <p className="mt-2 text-gray-600">Loading services...</p>
                  </div>
                ) : isServicesError ? (
                  <div className="text-center py-12 text-red-600">
                    Error loading services. Please try again.
                  </div>
                ) : filteredServices.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    {searchTerm ? "No services match your search." : "No services yet."}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredServices.map((service) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <CardTitle className="text-lg font-semibold">
                                {service.title}
                              </CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="h-40 mb-3 bg-gray-100 rounded-md overflow-hidden">
                              {service.image ? (
                                <img
                                  src={service.image}
                                  alt={service.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full bg-gray-200">
                                  <Image className="h-12 w-12 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                              {service.description}
                            </p>
                            {service.features && service.features.length > 0 && (
                              <div className="mt-3">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {service.features.slice(0, 3).map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                                      <span className="line-clamp-1">{feature}</span>
                                    </li>
                                  ))}
                                  {service.features.length > 3 && (
                                    <li className="text-orange-600 text-xs">
                                      +{service.features.length - 3} more features
                                    </li>
                                  )}
                                </ul>
                              </div>
                            )}
                          </CardContent>
                          <CardFooter className="pt-0 flex justify-end gap-2">
                            <Button variant="outline" size="sm" className="text-blue-600">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600"
                              onClick={() => deleteServiceMutation.mutate(service.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="testimonials">
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Testimonials Management</h2>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Testimonial
                  </Button>
                </div>

                {isLoadingTestimonials ? (
                  <div className="text-center py-12">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-400 border-r-transparent"></div>
                    <p className="mt-2 text-gray-600">Loading testimonials...</p>
                  </div>
                ) : isTestimonialsError ? (
                  <div className="text-center py-12 text-red-600">
                    Error loading testimonials. Please try again.
                  </div>
                ) : filteredTestimonials.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    {searchTerm ? "No testimonials match your search." : "No testimonials yet."}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTestimonials.map((testimonial) => (
                      <motion.div
                        key={testimonial.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-orange-200 hover:shadow-md transition-all"
                      >
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="flex">
                                {Array(5).fill(0).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                    fill={i < testimonial.rating ? 'currentColor' : 'none'}
                                  />
                                ))}
                              </div>
                              <h3 className="font-medium text-gray-900 mt-1">{testimonial.name}</h3>
                              <div className="text-sm text-gray-500">{testimonial.location}</div>
                            </div>
                            <div className="flex">
                              {testimonial.hasVideo && (
                                <Badge variant="secondary" className="ml-2 bg-red-100 text-red-800 hover:bg-red-200">
                                  <Video className="h-3 w-3 mr-1" />
                                  Video
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <blockquote className="text-gray-600 text-sm italic mb-4 border-l-2 border-gray-200 pl-3">
                            "{testimonial.content}"
                          </blockquote>
                          
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm" className="text-blue-600">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600"
                              onClick={() => deleteTestimonialMutation.mutate(testimonial.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="faqs">
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">FAQs Management</h2>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add FAQ
                  </Button>
                </div>

                {isLoadingFaqs ? (
                  <div className="text-center py-12">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-400 border-r-transparent"></div>
                    <p className="mt-2 text-gray-600">Loading FAQs...</p>
                  </div>
                ) : isFaqsError ? (
                  <div className="text-center py-12 text-red-600">
                    Error loading FAQs. Please try again.
                  </div>
                ) : filteredFaqs.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    {searchTerm ? "No FAQs match your search." : "No FAQs yet."}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredFaqs.map((faq) => (
                      <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Accordion type="single" collapsible className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                          <AccordionItem value={`faq-${faq.id}`} className="border-0">
                            <div className="flex items-center justify-between px-4 py-3">
                              <AccordionTrigger className="flex-1 text-left">
                                <div className="font-medium">{faq.question}</div>
                              </AccordionTrigger>
                              <div className="flex gap-2 ml-4">
                                <Button variant="outline" size="sm" className="text-blue-600">
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteFaqMutation.mutate(faq.id);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                            <AccordionContent className="px-4 pb-3 pt-1 text-sm text-gray-600">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

// Product Manager Component
const ProductManager = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
    isBestseller: false,
    isNew: false,
    rating: 4.0
  });

  // Fetch all products
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/products");
        const data = await res.json();
        return data.products || [];
      } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
      }
    }
  });

  // Add product mutation
  const addProductMutation = useMutation({
    mutationFn: async (newProduct) => {
      const res = await apiRequest("POST", "/api/products", newProduct);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Product added",
        description: "The product has been added successfully.",
      });
      setIsAddDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Failed to add product",
        description: error.message || "There was an error adding the product.",
        variant: "destructive",
      });
    },
  });

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: async (updatedProduct) => {
      const res = await apiRequest("PUT", `/api/products/${updatedProduct.id}`, updatedProduct);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Product updated",
        description: "The product has been updated successfully.",
      });
      setEditingProduct(null);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Failed to update product",
        description: error.message || "There was an error updating the product.",
        variant: "destructive",
      });
    },
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: async (id) => {
      await apiRequest("DELETE", `/api/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Product deleted",
        description: "The product has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete product",
        description: error.message || "There was an error deleting the product.",
        variant: "destructive",
      });
    },
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? parseFloat(value) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ensure price is a number
    const formattedProduct = {
      ...productForm,
      price: parseInt(productForm.price, 10)
    };
    
    if (editingProduct) {
      updateProductMutation.mutate({ ...formattedProduct, id: editingProduct.id });
    } else {
      addProductMutation.mutate(formattedProduct);
    }
  };

  // Reset form
  const resetForm = () => {
    setProductForm({
      name: "",
      description: "",
      price: 0,
      category: "",
      image: "",
      isBestseller: false,
      isNew: false,
      rating: 4.0
    });
  };

  // Edit product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      isBestseller: product.isBestseller || false,
      isNew: product.isNew || false,
      rating: product.rating
    });
    setIsAddDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Product Management</h2>
        <Button 
          onClick={() => {
            resetForm();
            setEditingProduct(null);
            setIsAddDialogOpen(true);
          }}
          className="bg-orange-600 hover:bg-orange-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4 text-white" />
          Add New Product
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-400 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading products...</p>
        </div>
      ) : isError ? (
        <div className="text-center py-12 text-red-600">
          Error loading products. Please try again.
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
          <Package className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No products yet</h3>
          <p className="text-gray-500 mb-6">Get started by adding your first product.</p>
          <Button 
            onClick={() => {
              resetForm();
              setEditingProduct(null);
              setIsAddDialogOpen(true);
            }}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Add Product
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video w-full overflow-hidden bg-gray-100">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <Image className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <div>
                    {product.isBestseller && <Badge className="mr-2 bg-orange-500">Bestseller</Badge>}
                    {product.isNew && <Badge className="bg-green-500">New</Badge>}
                  </div>
                </div>
                <CardDescription className="flex items-center mt-1">
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <span className="text-xs ml-2 text-gray-500">({product.rating.toFixed(1)})</span>
                  <Badge variant="outline" className="ml-auto">
                    {product.category}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-gray-600 text-sm line-clamp-2">
                  {product.description}
                </div>
                <div className="mt-3 font-semibold text-lg text-orange-600">
                  ₹{product.price.toLocaleString()}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-orange-600 border-orange-200 hover:bg-orange-50"
                  onClick={() => handleEditProduct(product)}
                >
                  <Edit className="h-4 w-4 mr-1 text-white group-hover:text-black transition-colors" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => deleteProductMutation.mutate(product.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1 text-white group-hover:text-black transition-colors" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={productForm.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div className="col-span-1">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={productForm.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="mt-1"
                  />
                </div>
                <div className="col-span-1">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    name="category"
                    value={productForm.category}
                    onValueChange={(value) => setProductForm(prev => ({ ...prev, category: value }))}
                    required
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCT_CATEGORIES.map(category => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={productForm.description}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    rows={4}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={productForm.image}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="col-span-1">
                  <Label htmlFor="rating">Rating (0-5)</Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    value={productForm.rating}
                    onChange={handleInputChange}
                    required
                    min="0"
                    max="5"
                    step="0.1"
                    className="mt-1"
                  />
                </div>
                <div className="col-span-1 flex items-end space-x-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isBestseller"
                      name="isBestseller"
                      checked={productForm.isBestseller}
                      onCheckedChange={(checked) => setProductForm(prev => ({ ...prev, isBestseller: checked }))}
                    />
                    <Label htmlFor="isBestseller">Bestseller</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isNew"
                      name="isNew"
                      checked={productForm.isNew}
                      onCheckedChange={(checked) => setProductForm(prev => ({ ...prev, isNew: checked }))}
                    />
                    <Label htmlFor="isNew">New Product</Label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-orange-600 hover:bg-orange-700"
                disabled={addProductMutation.isPending || updateProductMutation.isPending}
              >
                {addProductMutation.isPending || updateProductMutation.isPending ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-white border-r-transparent" />
                    {editingProduct ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{editingProduct ? "Update Product" : "Add Product"}</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Service Manager Component
const ServiceManager = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    title: "",
    description: "",
    image: "",
    features: [""],
    slug: ""
  });

  // Fetch all services
  const {
    data: services = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/services");
        return await res.json();
      } catch (error) {
        console.error("Failed to fetch services:", error);
        return [];
      }
    }
  });

  // Add service mutation
  const addServiceMutation = useMutation({
    mutationFn: async (newService) => {
      const res = await apiRequest("POST", "/api/services", newService);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({
        title: "Service added",
        description: "The service has been added successfully.",
      });
      setIsAddDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Failed to add service",
        description: error.message || "There was an error adding the service.",
        variant: "destructive",
      });
    },
  });

  // Update service mutation
  const updateServiceMutation = useMutation({
    mutationFn: async (updatedService) => {
      const res = await apiRequest("PUT", `/api/services/${updatedService.id}`, updatedService);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({
        title: "Service updated",
        description: "The service has been updated successfully.",
      });
      setEditingService(null);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Failed to update service",
        description: error.message || "There was an error updating the service.",
        variant: "destructive",
      });
    },
  });

  // Delete service mutation
  const deleteServiceMutation = useMutation({
    mutationFn: async (id) => {
      await apiRequest("DELETE", `/api/services/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({
        title: "Service deleted",
        description: "The service has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete service",
        description: error.message || "There was an error deleting the service.",
        variant: "destructive",
      });
    },
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle feature changes
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...serviceForm.features];
    newFeatures[index] = value;
    setServiceForm((prev) => ({
      ...prev,
      features: newFeatures,
    }));
  };

  // Add a new feature field
  const addFeatureField = () => {
    setServiceForm((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  // Remove a feature field
  const removeFeatureField = (index) => {
    if (serviceForm.features.length > 1) {
      const newFeatures = [...serviceForm.features];
      newFeatures.splice(index, 1);
      setServiceForm((prev) => ({
        ...prev,
        features: newFeatures,
      }));
    }
  };

  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };

  // Auto-generate slug when title changes
  useEffect(() => {
    if (serviceForm.title && !editingService) {
      setServiceForm((prev) => ({
        ...prev,
        slug: generateSlug(prev.title),
      }));
    }
  }, [serviceForm.title, editingService]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out empty features
    const filteredFeatures = serviceForm.features.filter(feature => feature.trim() !== "");
    
    const serviceData = {
      ...serviceForm,
      features: filteredFeatures,
    };
    
    if (editingService) {
      updateServiceMutation.mutate({ ...serviceData, id: editingService.id });
    } else {
      addServiceMutation.mutate(serviceData);
    }
  };

  // Reset form
  const resetForm = () => {
    setServiceForm({
      title: "",
      description: "",
      image: "",
      features: [""],
      slug: ""
    });
  };

  // Edit service
  const handleEditService = (service) => {
    setEditingService(service);
    setServiceForm({
      title: service.title,
      description: service.description,
      image: service.image,
      features: service.features,
      slug: service.slug
    });
    setIsAddDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Service Management</h2>
        <Button 
          onClick={() => {
            resetForm();
            setEditingService(null);
            setIsAddDialogOpen(true);
          }}
          className="bg-orange-600 hover:bg-orange-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4 text-white" />
          Add New Service
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-400 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading services...</p>
        </div>
      ) : isError ? (
        <div className="text-center py-12 text-red-600">
          Error loading services. Please try again.
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
          <Settings className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No services yet</h3>
          <p className="text-gray-500 mb-6">Get started by adding your first service.</p>
          <Button 
            onClick={() => {
              resetForm();
              setEditingService(null);
              setIsAddDialogOpen(true);
            }}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Add Service
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video w-full overflow-hidden bg-gray-100">
                {service.image ? (
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <Settings className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Badge variant="outline">
                    {service.slug}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {service.description}
                </div>
                {service.features && service.features.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Features:</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-orange-600 border-orange-200 hover:bg-orange-50"
                  onClick={() => handleEditService(service)}
                >
                  <Edit className="h-4 w-4 mr-1 text-white group-hover:text-black transition-colors" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => deleteServiceMutation.mutate(service.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1 text-white group-hover:text-black transition-colors" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Service Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="title">Service Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={serviceForm.title}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="slug">Slug</Label>
                  <div className="flex gap-2">
                    <Input
                      id="slug"
                      name="slug"
                      value={serviceForm.slug}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="mt-1"
                      onClick={() => setServiceForm(prev => ({...prev, slug: generateSlug(prev.title)}))}
                    >
                      Generate
                    </Button>
                  </div>
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={serviceForm.description}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    rows={4}
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={serviceForm.image}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div className="col-span-2">
                  <div className="flex justify-between items-center">
                    <Label>Features</Label>
                    <Button 
                      type="button" 
                      size="sm" 
                      variant="outline" 
                      onClick={addFeatureField}
                      className="h-8 px-2"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Feature
                    </Button>
                  </div>
                  
                  <div className="space-y-2 mt-2">
                    {serviceForm.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          placeholder={`Feature ${index + 1}`}
                          className="flex-grow"
                        />
                        {serviceForm.features.length > 1 && (
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            onClick={() => removeFeatureField(index)}
                            className="h-10 w-10 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-orange-600 hover:bg-orange-700"
                disabled={addServiceMutation.isPending || updateServiceMutation.isPending}
              >
                {addServiceMutation.isPending || updateServiceMutation.isPending ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-white border-r-transparent" />
                    {editingService ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{editingService ? "Update Service" : "Add Service"}</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Testimonial Manager Component
const TestimonialManager = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    location: "",
    rating: 5,
    content: "",
    hasVideo: false
  });

  // Fetch all testimonials
  const {
    data: testimonials = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/testimonials");
        return await res.json();
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        return [];
      }
    }
  });

  // Add testimonial mutation
  const addTestimonialMutation = useMutation({
    mutationFn: async (newTestimonial) => {
      const res = await apiRequest("POST", "/api/testimonials", newTestimonial);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast({
        title: "Testimonial added",
        description: "The testimonial has been added successfully.",
      });
      setIsAddDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Failed to add testimonial",
        description: error.message || "There was an error adding the testimonial.",
        variant: "destructive",
      });
    },
  });

  // Update testimonial mutation
  const updateTestimonialMutation = useMutation({
    mutationFn: async (updatedTestimonial) => {
      const res = await apiRequest("PUT", `/api/testimonials/${updatedTestimonial.id}`, updatedTestimonial);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast({
        title: "Testimonial updated",
        description: "The testimonial has been updated successfully.",
      });
      setEditingTestimonial(null);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Failed to update testimonial",
        description: error.message || "There was an error updating the testimonial.",
        variant: "destructive",
      });
    },
  });

  // Delete testimonial mutation
  const deleteTestimonialMutation = useMutation({
    mutationFn: async (id) => {
      await apiRequest("DELETE", `/api/testimonials/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast({
        title: "Testimonial deleted",
        description: "The testimonial has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete testimonial",
        description: error.message || "There was an error deleting the testimonial.",
        variant: "destructive",
      });
    },
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTestimonialForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle rating change
  const handleRatingChange = (value) => {
    setTestimonialForm((prev) => ({
      ...prev,
      rating: value,
    }));
  };

  // Reset form
  const resetForm = () => {
    setTestimonialForm({
      name: "",
      location: "",
      rating: 5,
      content: "",
      hasVideo: false
    });
  };

  // Edit testimonial
  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonial(testimonial);
    setTestimonialForm({
      name: testimonial.name,
      location: testimonial.location,
      rating: testimonial.rating,
      content: testimonial.content,
      hasVideo: testimonial.hasVideo
    });
    setIsAddDialogOpen(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const testimonialData = {
      ...testimonialForm,
      rating: Number(testimonialForm.rating)
    };
    
    if (editingTestimonial) {
      updateTestimonialMutation.mutate({ ...testimonialData, id: editingTestimonial.id });
    } else {
      addTestimonialMutation.mutate(testimonialData);
    }
  };

  // Get star rating display
  const getStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Testimonial Management</h2>
        <Button 
          onClick={() => {
            resetForm();
            setEditingTestimonial(null);
            setIsAddDialogOpen(true);
          }}
          className="bg-orange-600 hover:bg-orange-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4 text-white" />
          Add New Testimonial
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-400 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading testimonials...</p>
        </div>
      ) : isError ? (
        <div className="text-center py-12 text-red-600">
          Error loading testimonials. Please try again.
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
          <MessageCircle className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No testimonials yet</h3>
          <p className="text-gray-500 mb-6">Get started by adding your first customer testimonial.</p>
          <Button 
            onClick={() => {
              resetForm();
              setEditingTestimonial(null);
              setIsAddDialogOpen(true);
            }}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Add Testimonial
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.location}</CardDescription>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {getStarRating(testimonial.rating)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6">
                  <div className="absolute left-0 top-0 text-4xl text-orange-400">"</div>
                  <div className="text-gray-600 italic line-clamp-5">{testimonial.content}</div>
                  <div className="absolute bottom-0 right-0 text-4xl text-orange-400">"</div>
                </div>
                {testimonial.hasVideo && (
                  <Badge className="mt-4 bg-orange-100 text-orange-800 hover:bg-orange-200">
                    <Video className="h-3 w-3 mr-1" />
                    With Video
                  </Badge>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-orange-600 border-orange-200 hover:bg-orange-50"
                  onClick={() => handleEditTestimonial(testimonial)}
                >
                  <Edit className="h-4 w-4 mr-1 text-white group-hover:text-black transition-colors" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => deleteTestimonialMutation.mutate(testimonial.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1 text-white group-hover:text-black transition-colors" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Testimonial Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="name">Customer Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={testimonialForm.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={testimonialForm.location}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    placeholder="Madurai, Tamil Nadu"
                  />
                </div>
                
                <div className="col-span-2">
                  <Label>Rating</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <Star
                          key={value}
                          className={`h-6 w-6 cursor-pointer ${
                            value <= testimonialForm.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                          onClick={() => handleRatingChange(value)}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({testimonialForm.rating}/5)</span>
                  </div>
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="content">Testimonial Content</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={testimonialForm.content}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    rows={6}
                    placeholder="What did the customer say about your services?"
                  />
                </div>
                
                <div className="col-span-2 flex items-center space-x-2">
                  <Checkbox
                    id="hasVideo"
                    name="hasVideo"
                    checked={testimonialForm.hasVideo}
                    onCheckedChange={(checked) => {
                      setTestimonialForm((prev) => ({
                        ...prev,
                        hasVideo: checked
                      }));
                    }}
                  />
                  <Label htmlFor="hasVideo" className="cursor-pointer">
                    This testimonial has a video
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-orange-600 hover:bg-orange-700"
                disabled={addTestimonialMutation.isPending || updateTestimonialMutation.isPending}
              >
                {addTestimonialMutation.isPending || updateTestimonialMutation.isPending ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-white border-r-transparent" />
                    {editingTestimonial ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{editingTestimonial ? "Update Testimonial" : "Add Testimonial"}</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// FAQ Manager Component
const FAQManager = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: ""
  });

  // Fetch all FAQs
  const {
    data: faqs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/faqs");
        return await res.json();
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
        return [];
      }
    }
  });

  // Add FAQ mutation
  const addFaqMutation = useMutation({
    mutationFn: async (newFaq) => {
      const res = await apiRequest("POST", "/api/faqs", newFaq);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      toast({
        title: "FAQ added",
        description: "The FAQ has been added successfully.",
      });
      setIsAddDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Failed to add FAQ",
        description: error.message || "There was an error adding the FAQ.",
        variant: "destructive",
      });
    },
  });

  // Update FAQ mutation
  const updateFaqMutation = useMutation({
    mutationFn: async (updatedFaq) => {
      const res = await apiRequest("PUT", `/api/faqs/${updatedFaq.id}`, updatedFaq);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      toast({
        title: "FAQ updated",
        description: "The FAQ has been updated successfully.",
      });
      setEditingFaq(null);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Failed to update FAQ",
        description: error.message || "There was an error updating the FAQ.",
        variant: "destructive",
      });
    },
  });

  // Delete FAQ mutation
  const deleteFaqMutation = useMutation({
    mutationFn: async (id) => {
      await apiRequest("DELETE", `/api/faqs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      toast({
        title: "FAQ deleted",
        description: "The FAQ has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete FAQ",
        description: error.message || "There was an error deleting the FAQ.",
        variant: "destructive",
      });
    },
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFaqForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset form
  const resetForm = () => {
    setFaqForm({
      question: "",
      answer: ""
    });
  };

  // Edit FAQ
  const handleEditFaq = (faq) => {
    setEditingFaq(faq);
    setFaqForm({
      question: faq.question,
      answer: faq.answer
    });
    setIsAddDialogOpen(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const faqData = { ...faqForm };
    
    if (editingFaq) {
      updateFaqMutation.mutate({ ...faqData, id: editingFaq.id });
    } else {
      addFaqMutation.mutate(faqData);
    }
  };

  // Get a shortened answer version for preview
  const getShortenedAnswer = (answer, maxLength = 150) => {
    if (answer.length <= maxLength) return answer;
    return answer.slice(0, maxLength) + "...";
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">FAQ Management</h2>
        <Button 
          onClick={() => {
            resetForm();
            setEditingFaq(null);
            setIsAddDialogOpen(true);
          }}
          className="bg-orange-600 hover:bg-orange-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4 text-white" />
          Add New FAQ
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-400 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading FAQs...</p>
        </div>
      ) : isError ? (
        <div className="text-center py-12 text-red-600">
          Error loading FAQs. Please try again.
        </div>
      ) : faqs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
          <HelpCircle className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No FAQs yet</h3>
          <p className="text-gray-500 mb-6">Get started by adding your first frequently asked question.</p>
          <Button 
            onClick={() => {
              resetForm();
              setEditingFaq(null);
              setIsAddDialogOpen(true);
            }}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Add FAQ
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={faq.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="py-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-semibold text-orange-600">{index + 1}</span>
                    </div>
                    <CardTitle className="text-lg leading-tight">{faq.question}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="py-0">
                <div className="pl-11 pr-2 text-gray-600">
                  <div className="whitespace-pre-line">{getShortenedAnswer(faq.answer)}</div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-4 pb-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-orange-600 border-orange-200 hover:bg-orange-50"
                  onClick={() => handleEditFaq(faq)}
                >
                  <Edit className="h-4 w-4 mr-1 text-white group-hover:text-black transition-colors" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => deleteFaqMutation.mutate(faq.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1 text-white group-hover:text-black transition-colors" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit FAQ Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingFaq ? "Edit FAQ" : "Add New FAQ"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="question">Question</Label>
                  <Input
                    id="question"
                    name="question"
                    value={faqForm.question}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    placeholder="What services do you offer?"
                  />
                </div>
                
                <div>
                  <Label htmlFor="answer">Answer</Label>
                  <Textarea
                    id="answer"
                    name="answer"
                    value={faqForm.answer}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    rows={8}
                    placeholder="Provide a detailed answer to the question..."
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-orange-600 hover:bg-orange-700"
                disabled={addFaqMutation.isPending || updateFaqMutation.isPending}
              >
                {addFaqMutation.isPending || updateFaqMutation.isPending ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-white border-r-transparent" />
                    {editingFaq ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{editingFaq ? "Update FAQ" : "Add FAQ"}</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;