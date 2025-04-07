import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { 
  Shield, Lock, LogOut, Users, ClipboardList, 
  Search, Trash2, ChevronDown, ChevronUp, Eye, 
  MessageSquare, Phone, Calendar, Mail, Home
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { COMPANY_NAME } from "@/lib/constants";

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
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="inquiries" className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  Popup Form Inquiries ({inquiries.length})
                </TabsTrigger>
                <TabsTrigger value="contacts" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Contact Form Submissions ({contactSubmissions.length})
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
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;