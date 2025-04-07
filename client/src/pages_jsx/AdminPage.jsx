import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { 
  Shield, Lock, LogOut, Users, ClipboardList, Package, PenTool,
  Search, Trash2, ChevronDown, ChevronUp, Eye, Edit, Plus, Star,
  MessageSquare, Phone, Calendar, Mail, Home, HelpCircle, Settings,
  FileText, Award, DollarSign, Image, MessageCircle, Layers, Save
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

  // Delete inquiry mutation
  const deleteInquiryMutation = useMutation({
    mutationFn: async (id) => {
      await apiRequest("DELETE", `/api/inquiries/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["inquiries"]);
      toast({
        title: "Inquiry deleted",
        description: "The inquiry has been removed successfully.",
      });
    },
    onError: () => {
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
      await apiRequest("DELETE", `/api/contacts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
      toast({
        title: "Contact submission deleted",
        description: "The contact form submission has been removed successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Failed to delete",
        description: "There was an error deleting the contact submission.",
        variant: "destructive",
      });
    },
  });

  // Filter inquiries based on search term
  const filteredInquiries = inquiries.filter((inquiry) => {
    const searchable = `${inquiry.name} ${inquiry.phone} ${inquiry.email} ${inquiry.issueType} ${inquiry.message} ${inquiry.address}`.toLowerCase();
    return searchable.includes(searchTerm.toLowerCase());
  });

  // Filter contact submissions based on search term
  const filteredContacts = contactSubmissions.filter((contact) => {
    const searchable = `${contact.name} ${contact.phone} ${contact.email} ${contact.service} ${contact.message}`.toLowerCase();
    return searchable.includes(searchTerm.toLowerCase());
  });

  // Toggle expanded item
  const toggleExpand = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
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
            <div className="relative mb-6">
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
            
            <Tabs defaultValue="inquiries">
              <TabsList className="grid w-full grid-cols-6 mb-6">
                <TabsTrigger value="inquiries" className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 text-white group-hover:text-black transition-colors" />
                  Inquiries
                </TabsTrigger>
                <TabsTrigger value="contacts" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-white group-hover:text-black transition-colors" />
                  Contacts
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
                  <div className="divide-y divide-gray-200">
                    {filteredInquiries.map((inquiry) => (
                      <motion.div 
                        key={inquiry.id} 
                        className="py-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div 
                          className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
                          onClick={() => toggleExpand(inquiry.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="font-semibold text-orange-600">
                                {inquiry.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{inquiry.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone className="h-3 w-3" />
                                {inquiry.phone}
                              </div>
                              <div className="inline-block px-2 py-1 mt-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                                {inquiry.issueType || "General Inquiry"}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 mr-2">
                              {inquiry.createdAt ? formatDate(inquiry.createdAt) : "Recent"}
                            </span>
                            <button
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExpand(inquiry.id);
                              }}
                            >
                              {expandedItem === inquiry.id ? (
                                <ChevronUp className="h-5 w-5 text-gray-500" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-gray-500" />
                              )}
                            </button>
                          </div>
                        </div>
                        
                        {expandedItem === inquiry.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.3 }}
                            className="mt-2 pl-12 pr-2"
                          >
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                {inquiry.email && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <span>{inquiry.email}</span>
                                  </div>
                                )}
                                {inquiry.address && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <Home className="h-4 w-4 text-gray-500" />
                                    <span>{inquiry.address}</span>
                                  </div>
                                )}
                                {inquiry.createdAt && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <span>{formatDate(inquiry.createdAt)}</span>
                                  </div>
                                )}
                              </div>
                              
                              {inquiry.message && (
                                <div className="mb-4">
                                  <h4 className="text-sm font-medium text-gray-700 mb-1">Message:</h4>
                                  <p className="text-sm text-gray-600 bg-white p-3 rounded border border-gray-200">
                                    {inquiry.message}
                                  </p>
                                </div>
                              )}
                              
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 border-red-200 hover:bg-red-50"
                                  onClick={() => deleteInquiryMutation.mutate(inquiry.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="contacts">
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
                    {searchTerm ? "No contact submissions match your search." : "No contact submissions yet."}
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {filteredContacts.map((contact) => (
                      <motion.div 
                        key={contact.id} 
                        className="py-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div 
                          className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
                          onClick={() => toggleExpand(`contact-${contact.id}`)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="font-semibold text-blue-600">
                                {contact.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{contact.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone className="h-3 w-3" />
                                {contact.phone}
                              </div>
                              <div className="inline-block px-2 py-1 mt-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                {contact.service || "Contact Request"}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 mr-2">
                              {contact.createdAt ? formatDate(contact.createdAt) : "Recent"}
                            </span>
                            <button
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExpand(`contact-${contact.id}`);
                              }}
                            >
                              {expandedItem === `contact-${contact.id}` ? (
                                <ChevronUp className="h-5 w-5 text-gray-500" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-gray-500" />
                              )}
                            </button>
                          </div>
                        </div>
                        
                        {expandedItem === `contact-${contact.id}` && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.3 }}
                            className="mt-2 pl-12 pr-2"
                          >
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                {contact.email && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <span>{contact.email}</span>
                                  </div>
                                )}
                                {contact.createdAt && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <span>{formatDate(contact.createdAt)}</span>
                                  </div>
                                )}
                              </div>
                              
                              {contact.message && (
                                <div className="mb-4">
                                  <h4 className="text-sm font-medium text-gray-700 mb-1">Message:</h4>
                                  <p className="text-sm text-gray-600 bg-white p-3 rounded border border-gray-200">
                                    {contact.message}
                                  </p>
                                </div>
                              )}
                              
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 border-red-200 hover:bg-red-50"
                                  onClick={() => deleteContactMutation.mutate(contact.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="products">
                <ProductManager />
              </TabsContent>
              
              <TabsContent value="services">
                <ServiceManager />
              </TabsContent>
              
              <TabsContent value="testimonials">
                <TestimonialManager />
              </TabsContent>
              
              <TabsContent value="faqs">
                <FAQManager />
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
      queryClient.invalidateQueries(["products"]);
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
      queryClient.invalidateQueries(["products"]);
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
      queryClient.invalidateQueries(["products"]);
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
                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.description}
                </p>
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
  // To be implemented
  return (
    <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
      <Settings className="h-12 w-12 mx-auto text-gray-400 mb-3" />
      <h3 className="text-lg font-medium text-gray-900">Service Management</h3>
      <p className="text-gray-500 mb-6">Manage your website's service offerings.</p>
      <p className="text-orange-600">Coming soon...</p>
    </div>
  );
};

// Testimonial Manager Component
const TestimonialManager = () => {
  // To be implemented
  return (
    <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
      <MessageCircle className="h-12 w-12 mx-auto text-gray-400 mb-3" />
      <h3 className="text-lg font-medium text-gray-900">Testimonial Management</h3>
      <p className="text-gray-500 mb-6">Manage customer testimonials displayed on your website.</p>
      <p className="text-orange-600">Coming soon...</p>
    </div>
  );
};

// FAQ Manager Component
const FAQManager = () => {
  // To be implemented
  return (
    <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
      <HelpCircle className="h-12 w-12 mx-auto text-gray-400 mb-3" />
      <h3 className="text-lg font-medium text-gray-900">FAQ Management</h3>
      <p className="text-gray-500 mb-6">Manage frequently asked questions and answers.</p>
      <p className="text-orange-600">Coming soon...</p>
    </div>
  );
};

export default AdminPage;