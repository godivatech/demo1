import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { CSVLink } from "react-csv";
import {
  Shield,
  Lock,
  LogOut,
  Users,
  ClipboardList,
  Search,
  Trash2,
  ChevronDown,
  Eye,
  MessageSquare,
  AlertCircle,
  Download,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { COMPANY_NAME } from "@/lib/constants";

// Admin credentials (hardcoded for simplicity - normally would be in a secure backend)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "buildingdoctor2023";

const AdminPage = () => {
  const [location, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItem, setExpandedItem] = useState(null);
  const [activeTab, setActiveTab] = useState("inquiries");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc"); // Default to newest first
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [lastUpdated, setLastUpdated] = useState(null);
  const { toast } = useToast();
  const webSocketRef = useRef(null);

  // Check if user is already authenticated (from localStorage)
  useEffect(() => {
    const authStatus = localStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Set up WebSocket connection for real-time updates
  useEffect(() => {
    if (isAuthenticated) {
      if (
        webSocketRef.current &&
        webSocketRef.current.readyState === WebSocket.OPEN
      ) {
        webSocketRef.current.close();
      }

      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}/ws`;

      const socket = new WebSocket(wsUrl);
      webSocketRef.current = socket;

      socket.addEventListener("open", (event) => {
        console.log("WebSocket connection established");
      });

      socket.addEventListener("message", (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log("WebSocket message received:", message);

          if (message.type === "inquiries_updated") {
            queryClient.setQueryData(["inquiries"], message.data);
            setLastUpdated({
              type: "inquiries",
              timestamp: new Date().toISOString(),
            });
            if (activeTab === "inquiries") {
              toast({
                title: "Data updated",
                description: "Inquiries have been updated in real-time.",
                duration: 2000,
              });
            }
          } else if (message.type === "contacts_updated") {
            queryClient.setQueryData(["contacts"], message.data);
            setLastUpdated({
              type: "contacts",
              timestamp: new Date().toISOString(),
            });
            if (activeTab === "contacts") {
              toast({
                title: "Data updated",
                description: "Contacts have been updated in real-time.",
                duration: 2000,
              });
            }
          } else if (message.type === "intents_updated") {
            queryClient.setQueryData(["intents"], message.data);
            setLastUpdated({
              type: "intents",
              timestamp: new Date().toISOString(),
            });
            if (activeTab === "intents") {
              toast({
                title: "Data updated",
                description:
                  "Exit intent forms have been updated in real-time.",
                duration: 2000,
              });
            }
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      });

      socket.addEventListener("error", (error) => {
        console.error("WebSocket error:", error);
      });

      socket.addEventListener("close", (event) => {
        console.log("WebSocket connection closed", event.code, event.reason);
      });

      return () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.close();
        }
      };
    }
  }, [isAuthenticated, toast, activeTab]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      credentials.username === ADMIN_USERNAME &&
      credentials.password === ADMIN_PASSWORD
    ) {
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

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);

    if (lastUpdated && lastUpdated.type === tabName) {
      setLastUpdated((prev) => {
        if (prev && prev.type === tabName) {
          return null;
        }
        return prev;
      });
    }
  };

  const fetchTabData = (endpoint) => {
    return async () => {
      try {
        const res = await apiRequest("GET", `/api/${endpoint}`);
        return await res.json();
      } catch (error) {
        console.error(`Failed to fetch ${endpoint}:`, error);
        return [];
      }
    };
  };

  const {
    data: inquiries = [],
    isLoading,
    isError,
    refetch: refetchInquiries,
  } = useQuery({
    queryKey: ["inquiries"],
    queryFn: fetchTabData("inquiries"),
    enabled:
      isAuthenticated && (activeTab === "inquiries" || activeTab === "all"),
    staleTime: 60000,
  });

  const {
    data: intentSubmissions = [],
    isLoading: isIntentsLoading,
    isError: isIntentsError,
    refetch: refetchIntents,
  } = useQuery({
    queryKey: ["intents"],
    queryFn: fetchTabData("intents"),
    enabled:
      isAuthenticated && (activeTab === "intents" || activeTab === "all"),
    staleTime: 60000,
  });

  const {
    data: contactSubmissions = [],
    isLoading: isLoadingContacts,
    isError: isContactError,
    refetch: refetchContacts,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: fetchTabData("contacts"),
    enabled:
      isAuthenticated && (activeTab === "contacts" || activeTab === "all"),
    staleTime: 60000,
  });

  const deleteInquiryMutation = useMutation({
    mutationFn: async (id) => {
      if (id === null || id === undefined) {
        console.error("Attempted to delete inquiry with null or undefined ID");
        throw new Error("Invalid inquiry ID");
      }

      const inquiryId =
        typeof id === "string" && id.includes("-")
          ? parseInt(id.split("-")[1])
          : parseInt(id);

      if (isNaN(inquiryId)) {
        console.error(`Invalid inquiry ID: ${id}`);
        throw new Error("Invalid inquiry ID");
      }

      const response = await apiRequest(
        "DELETE",
        `/api/inquiries/${inquiryId}`
      );
      return { id: inquiryId, response };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["inquiries"], (oldData) => {
        return oldData
          ? oldData.filter((inquiry) => inquiry.id !== data.id)
          : [];
      });

      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      refetchContacts();
      refetchIntents();

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

  const deleteContactMutation = useMutation({
    mutationFn: async (id) => {
      if (id === null || id === undefined) {
        console.error("Attempted to delete contact with null or undefined ID");
        throw new Error("Invalid contact ID");
      }

      const contactId =
        typeof id === "string" && id.includes("contact-")
          ? parseInt(id.replace("contact-", ""))
          : parseInt(id);

      if (isNaN(contactId)) {
        console.error(`Invalid contact ID: ${id}`);
        throw new Error("Invalid contact ID");
      }

      const response = await apiRequest("DELETE", `/api/contacts/${contactId}`);
      return { id: contactId, response };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["contacts"], (oldData) => {
        return oldData
          ? oldData.filter((contact) => contact.id !== data.id)
          : [];
      });

      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      refetchInquiries();
      refetchIntents();

      toast({
        title: "Contact submission deleted",
        description:
          "The contact form submission has been removed successfully.",
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

  const deleteIntentMutation = useMutation({
    mutationFn: async (id) => {
      if (id === null || id === undefined) {
        console.error("Attempted to delete intent with null or undefined ID");
        throw new Error("Invalid intent ID");
      }

      const intentId =
        typeof id === "string" && id.includes("intent-")
          ? parseInt(id.replace("intent-", ""))
          : parseInt(id);

      if (isNaN(intentId)) {
        console.error(`Invalid intent ID: ${id}`);
        throw new Error("Invalid intent ID");
      }

      const response = await apiRequest("DELETE", `/api/intents/${intentId}`);
      return { id: intentId, response };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["intents"], (oldData) => {
        return oldData ? oldData.filter((intent) => intent.id !== data.id) : [];
      });

      queryClient.invalidateQueries({ queryKey: ["intents"] });
      refetchInquiries();
      refetchContacts();

      toast({
        title: "Intent form submission deleted",
        description:
          "The exit intent form submission has been removed successfully.",
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

  const filteredInquiries = Array.isArray(inquiries)
    ? inquiries.filter((inquiry) => {
        if (!inquiry) return false;
        const searchable = `${inquiry.name || ""} ${inquiry.phone || ""} ${
          inquiry.email || ""
        } ${inquiry.issueType || ""} ${inquiry.message || ""} ${
          inquiry.address || ""
        }`.toLowerCase();
        return searchable.includes(searchTerm.toLowerCase());
      })
    : [];

  const filteredIntents = Array.isArray(intentSubmissions)
    ? intentSubmissions
        .filter((intent) => {
          if (!intent) return false;
          const searchable = `${intent.name || ""} ${intent.phone || ""} ${
            intent.service || ""
          } ${intent.message || ""}`.toLowerCase();
          return searchable.includes(searchTerm.toLowerCase());
        })
        .map((intent, index) => ({
          ...intent,
          _uniqueKey: `intent-${intent.id || ""}-${index}`,
        }))
    : [];

  const filteredContacts = Array.isArray(contactSubmissions)
    ? contactSubmissions
        .filter((contact) => {
          if (!contact) return false;
          const searchable = `${contact.name || ""} ${contact.phone || ""} ${
            contact.email || ""
          } ${contact.service || ""} ${contact.message || ""}`.toLowerCase();
          return searchable.includes(searchTerm.toLowerCase());
        })
        .map((contact, index) => ({
          ...contact,
          _uniqueKey: `contact-${contact.id || ""}-${index}`,
        }))
    : [];

  const toggleExpand = (id, type = "general") => {
    const formattedId = id.toString().includes("-") ? id : `${type}-${id}`;
    setExpandedItem(expandedItem === formattedId ? null : formattedId);
  };

  const formatDate = (dateString) => {
    try {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";
      return date.toLocaleString();
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Error";
    }
  };

  const formatDateForInput = (date) => {
    try {
      if (!date) return "";
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        console.error("Invalid date provided to formatDateForInput:", date);
        return "";
      }
      return parsedDate.toISOString().split("T")[0];
    } catch (error) {
      console.error("Error in formatDateForInput:", error);
      return "";
    }
  };

  const getPaginatedData = (data) => {
    if (!data || !Array.isArray(data)) {
      console.error("getPaginatedData received invalid data:", data);
      return [];
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    try {
      return data.slice(indexOfFirstItem, indexOfLastItem);
    } catch (error) {
      console.error("Error in getPaginatedData:", error);
      return [];
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, startDate, endDate]);

  const filterByDateRange = (data, startDate, endDate) => {
    if (!data || !Array.isArray(data)) {
      console.error("filterByDateRange received invalid data:", data);
      return [];
    }

    if (!startDate && !endDate) return data;

    return data.filter((item) => {
      if (!item || !item.createdAt) return false;

      const itemDate = new Date(item.createdAt);

      if (isNaN(itemDate.getTime())) return false;

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        return itemDate >= start && itemDate <= end;
      } else if (startDate) {
        const start = new Date(startDate);
        return itemDate >= start;
      } else if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        return itemDate <= end;
      }

      return true;
    });
  };

  const sortByDate = (data, order = "desc") => {
    if (!data || !Array.isArray(data)) {
      console.error("sortByDate received invalid data:", data);
      return [];
    }

    return [...data].sort((a, b) => {
      const dateA = a && a.createdAt ? new Date(a.createdAt) : new Date(0);
      const dateB = b && b.createdAt ? new Date(b.createdAt) : new Date(0);

      return order === "desc" ? dateB - dateA : dateA - dateB;
    });
  };

  const Pagination = ({ totalItems }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getPageNumbers = () => {
      const pageNumbers = [];
      const maxDisplayedPages = 5;

      if (totalPages <= maxDisplayedPages) {
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);

        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);

        if (currentPage <= 3) {
          endPage = Math.min(4, totalPages - 1);
        }

        if (currentPage >= totalPages - 2) {
          startPage = Math.max(2, totalPages - 3);
        }

        if (startPage > 2) {
          pageNumbers.push("...");
        }

        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }

        if (endPage < totalPages - 1) {
          pageNumbers.push("...");
        }

        if (totalPages > 1) {
          pageNumbers.push(totalPages);
        }
      }

      return pageNumbers;
    };

    const handlePrevPage = () => {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const goToPage = (page) => {
      if (typeof page === "number") {
        setCurrentPage(page);
      }
    };

    if (totalPages <= 1) return null;

    return (
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
        <div className="text-sm text-muted-foreground">
          Showing {Math.min(totalItems, (currentPage - 1) * itemsPerPage + 1)}
          {" - "}
          {Math.min(currentPage * itemsPerPage, totalItems)}
          {" of "}
          {totalItems} items
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0 flex items-center justify-center"
            aria-label="Previous page"
          >
            <ChevronDown className="h-4 w-4 rotate-90" />
          </Button>

          <div className="flex items-center">
            {getPageNumbers().map((page, index) =>
              typeof page === "number" ? (
                <Button
                  key={index}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(page)}
                  className={`h-8 w-8 p-0 mx-1 ${
                    currentPage === page ? "bg-primary hover:bg-secondary" : ""
                  }`}
                >
                  {page}
                </Button>
              ) : (
                <span key={index} className="mx-1">
                  ...
                </span>
              )
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0 flex items-center justify-center"
            aria-label="Next page"
          >
            <ChevronDown className="h-4 w-4 -rotate-90" />
          </Button>

          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[110px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 per page</SelectItem>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="25">25 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
              <SelectItem value="100">100 per page</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted pt-28 pb-12">
        <div className="container max-w-md mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
          >
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center text-foreground mb-2">
              Admin Login
            </h1>
            <p className="text-center text-muted-foreground mb-8">
              {COMPANY_NAME} Admin Dashboard
            </p>

            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Users className="h-5 w-5 text-muted-foreground" />
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
                    <Lock className="h-5 w-5 text-muted-foreground" />
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

              <Button
                type="submit"
                className="w-full mt-6 bg-primary hover:bg-secondary text-primary-foreground"
              >
                Login
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/">
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-primary"
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
    <div className="min-h-screen bg-background pt-28 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage inquiries and contact submissions
            </p>
          </div>

          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2 text-foreground border-foreground hover:bg-muted hover:text-primary"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
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
                <Dialog
                  open={isFilterDialogOpen}
                  onOpenChange={setIsFilterDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant={startDate || endDate ? "default" : "outline"}
                      className={`flex items-center gap-2 ${
                        startDate || endDate
                          ? "bg-primary hover:bg-secondary text-primary-foreground"
                          : "text-foreground"
                      }`}
                    >
                      <Filter className="h-4 w-4" />
                      {startDate || endDate ? "Filters Active" : "Filters"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Filter Data</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-1">
                        <label
                          htmlFor="advanced-search"
                          className="text-sm font-medium text-foreground"
                        >
                          Search
                        </label>
                        <Input
                          id="advanced-search"
                          placeholder="Search anything..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="mt-1"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Searches across all fields (name, phone, email, etc.)
                        </p>
                      </div>

                      <div className="pt-2 border-t">
                        <h4 className="text-sm font-medium mb-2 text-foreground">
                          Date Range
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label
                              htmlFor="start-date"
                              className="text-xs text-muted-foreground"
                            >
                              Start Date
                            </label>
                            <Input
                              id="start-date"
                              type="date"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                            />
                          </div>
                          <div className="space-y-1">
                            <label
                              htmlFor="end-date"
                              className="text-xs text-muted-foreground"
                            >
                              End Date
                            </label>
                            <Input
                              id="end-date"
                              type="date"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t">
                        <h4 className="text-sm font-medium mb-2 text-foreground">
                          Sort Order
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant={
                              sortOrder === "desc" ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => setSortOrder("desc")}
                            className={
                              sortOrder === "desc"
                                ? "bg-primary hover:bg-secondary text-primary-foreground"
                                : "text-foreground"
                            }
                          >
                            Newest First
                          </Button>
                          <Button
                            variant={
                              sortOrder === "asc" ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => setSortOrder("asc")}
                            className={
                              sortOrder === "asc"
                                ? "bg-primary hover:bg-secondary text-primary-foreground"
                                : "text-foreground"
                            }
                          >
                            Oldest First
                          </Button>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setStartDate("");
                          setEndDate("");
                          setSearchTerm("");
                          setSortOrder("desc");
                        }}
                        className="text-foreground"
                      >
                        Reset All
                      </Button>
                      <Button
                        onClick={() => setIsFilterDialogOpen(false)}
                        className="bg-primary hover:bg-secondary text-primary-foreground"
                      >
                        Apply Filters
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  onClick={() =>
                    setSortOrder(sortOrder === "desc" ? "asc" : "desc")
                  }
                  className="flex items-center gap-2 text-foreground border-foreground hover:bg-muted hover:text-primary"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  {sortOrder === "desc" ? "Newest First" : "Oldest First"}
                </Button>
              </div>
            </div>

            <Tabs
              defaultValue="inquiries"
              value={activeTab}
              onValueChange={(value) => {
                setActiveTab(value);
                setCurrentPage(1);
                setExpandedItem(null);
                if (value === "inquiries") refetchInquiries();
                if (value === "contacts") refetchContacts();
                if (value === "intents") refetchIntents();
              }}
            >
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger
                  value="inquiries"
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  onClick={() => handleTabChange("inquiries")}
                >
                  <ClipboardList className="h-4 w-4" />
                  Inquiries
                  {Array.isArray(inquiries) && inquiries.length > 0 && (
                    <span className="ml-1 text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full">
                      {inquiries.length}
                    </span>
                  )}
                  {lastUpdated &&
                    lastUpdated.type === "inquiries" &&
                    activeTab !== "inquiries" && (
                      <span className="relative flex h-2 w-2 ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                    )}
                </TabsTrigger>
                <TabsTrigger
                  value="contacts"
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  onClick={() => handleTabChange("contacts")}
                >
                  <MessageSquare className="h-4 w-4" />
                  Contacts
                  {Array.isArray(contactSubmissions) &&
                    contactSubmissions.length > 0 && (
                      <span className="ml-1 text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full">
                        {contactSubmissions.length}
                      </span>
                    )}
                  {lastUpdated &&
                    lastUpdated.type === "contacts" &&
                    activeTab !== "contacts" && (
                      <span className="relative flex h-2 w-2 ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                    )}
                </TabsTrigger>
                <TabsTrigger
                  value="intents"
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  onClick={() => handleTabChange("intents")}
                >
                  <AlertCircle className="h-4 w-4" />
                  Exit Intent
                  {Array.isArray(intentSubmissions) &&
                    intentSubmissions.length > 0 && (
                      <span className="ml-1 text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full">
                        {intentSubmissions.length}
                      </span>
                    )}
                  {lastUpdated &&
                    lastUpdated.type === "intents" &&
                    activeTab !== "intents" && (
                      <span className="relative flex h-2 w-2 ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                    )}
                </TabsTrigger>
              </TabsList>

              {lastUpdated && (
                <div className="text-xs text-muted-foreground mb-4 text-center">
                  Last update: {lastUpdated.type} at{" "}
                  {new Date(lastUpdated.timestamp).toLocaleTimeString()}
                </div>
              )}

              <TabsContent value="inquiries">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    Inquiries
                  </h2>

                  {!isLoading && !isError && filteredInquiries.length > 0 && (
                    <CSVLink
                      data={filterByDateRange(
                        filteredInquiries,
                        startDate,
                        endDate
                      ).map((inquiry) => ({
                        ID: inquiry.id,
                        Name: inquiry.name,
                        Phone: inquiry.phone,
                        Email: inquiry.email || "",
                        "Issue Type": inquiry.issueType || "General Inquiry",
                        Message: inquiry.message || "",
                        Address: inquiry.address || "",
                        "Created At": inquiry.createdAt
                          ? formatDate(inquiry.createdAt)
                          : "",
                      }))}
                      filename={`inquiries-${startDate || "all"}-to-${
                        endDate || "all"
                      }.csv`}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-secondary"
                    >
                      <Download className="h-4 w-4" />
                      Export CSV
                    </CSVLink>
                  )}
                </div>

                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                    <p className="mt-2 text-muted-foreground">
                      Loading inquiries...
                    </p>
                  </div>
                ) : isError ? (
                  <div className="text-center py-12 text-destructive">
                    Error loading inquiries. Please try again.
                  </div>
                ) : filteredInquiries.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    {searchTerm
                      ? "No inquiries match your search."
                      : "No inquiries yet."}
                  </div>
                ) : (
                  <div className="overflow-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-gray-200 px-4 py-2 text-left text-foreground">
                            Name
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-left text-foreground">
                            Phone
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-left text-foreground">
                            Issue Type
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-left text-foreground">
                            Email
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-left text-foreground">
                            Date
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-center text-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {getPaginatedData(
                          sortByDate(
                            filterByDateRange(
                              filteredInquiries,
                              startDate,
                              endDate
                            ),
                            sortOrder
                          )
                        ).map((inquiry, index) => (
                          <tr
                            key={`inquiry-${inquiry.id || index}`}
                            className="hover:bg-muted/50"
                          >
                            <td className="border border-gray-200 px-4 py-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="font-semibold text-muted-foreground text-xs">
                                    {inquiry.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <span>{inquiry.name}</span>
                              </div>
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                              {inquiry.phone}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                              <span className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                                {inquiry.issueType || "General Inquiry"}
                              </span>
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                              {inquiry.email || "-"}
                            </td>
                            <td className="border border-gray-200 px-4 py-2 text-sm text-foreground">
                              {inquiry.createdAt
                                ? formatDate(inquiry.createdAt)
                                : "Recent"}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                              <div className="flex justify-center gap-2">
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-destructive border-destructive/50 hover:bg-destructive/10"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Are you sure you want to delete this
                                        inquiry?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete the inquiry from{" "}
                                        {COMPANY_NAME}'s database.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() =>
                                          deleteInquiryMutation.mutate(
                                            inquiry.id
                                          )
                                        }
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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

                    <Pagination
                      totalItems={
                        sortByDate(
                          filterByDateRange(
                            filteredInquiries,
                            startDate,
                            endDate
                          ),
                          sortOrder
                        ).length
                      }
                    />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="intents">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    Exit Intent Form Submissions
                  </h2>

                  {!isIntentsLoading &&
                    !isIntentsError &&
                    filteredIntents.length > 0 && (
                      <CSVLink
                        data={filterByDateRange(
                          filteredIntents,
                          startDate,
                          endDate
                        ).map((intent) => ({
                          ID: intent.id,
                          Name: intent.name,
                          Phone: intent.phone,
                          Service: intent.service || "",
                          Message: intent.message || "",
                          "Created At": intent.createdAt
                            ? formatDate(intent.createdAt)
                            : "",
                        }))}
                        filename={`exit-intents-${startDate || "all"}-to-${
                          endDate || "all"
                        }.csv`}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-secondary"
                      >
                        <Download className="h-4 w-4" />
                        Export CSV
                      </CSVLink>
                    )}
                </div>

                {isIntentsLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                    <p className="mt-2 text-muted-foreground">
                      Loading exit intent form submissions...
                    </p>
                  </div>
                ) : isIntentsError ? (
                  <div className="text-center py-12 text-destructive">
                    Error loading exit intent form submissions. Please try
                    again.
                  </div>
                ) : filteredIntents.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    {searchTerm
                      ? "No exit intent form submissions match your search."
                      : "No exit intent form submissions yet."}
                  </div>
                ) : (
                  <div className="overflow-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-gray-200 px-4 py-2 text-left text-foreground">
                            Name
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-left text-foreground">
                            Phone
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-left text-foreground">
                            Service
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-left text-foreground">
                            Date
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-center text-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {getPaginatedData(
                          sortByDate(
                            filterByDateRange(
                              filteredIntents,
                              startDate,
                              endDate
                            ),
                            sortOrder
                          )
                        ).map((intent, index) => (
                          <tr
                            key={intent._uniqueKey}
                            className="hover:bg-muted/50"
                          >
                            <td className="border border-gray-200 px-4 py-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="font-semibold text-muted-foreground text-xs">
                                    {intent.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <span>{intent.name}</span>
                              </div>
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                              {intent.phone}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                              <span className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                                {intent.service || "Urgent Consultation"}
                              </span>
                            </td>
                            <td className="border border-gray-200 px-4 py-2 text-sm text-foreground">
                              {intent.createdAt
                                ? formatDate(intent.createdAt)
                                : "Recent"}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                              <div className="flex justify-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    toggleExpand(intent.id, "intent")
                                  }
                                  className="text-foreground border-foreground hover:bg-muted hover:text-primary"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-destructive border-destructive/50 hover:bg-destructive/10"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Are you sure you want to delete this
                                        intent form?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete the exit intent form
                                        from {COMPANY_NAME}'s database.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() =>
                                          deleteIntentMutation.mutate(intent.id)
                                        }
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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

                    <Pagination
                      totalItems={
                        sortByDate(
                          filterByDateRange(
                            filteredIntents,
                            startDate,
                            endDate
                          ),
                          sortOrder
                        ).length
                      }
                    />
                  </div>
                )}

                {expandedItem && expandedItem.startsWith("intent-") && (
                  <Dialog
                    open={
                      expandedItem !== null &&
                      expandedItem.startsWith("intent-")
                    }
                    onOpenChange={(open) => !open && setExpandedItem(null)}
                  >
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Exit Intent Form Details</DialogTitle>
                      </DialogHeader>

                      {intentSubmissions.find(
                        (i) => `intent-${i.id}` === expandedItem
                      ) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                          <div>
                            <h3 className="font-semibold mb-2 text-foreground">
                              Contact Information
                            </h3>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">
                                  Name:
                                </span>
                                <span>
                                  {
                                    intentSubmissions.find(
                                      (i) => `intent-${i.id}` === expandedItem
                                    ).name
                                  }
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">
                                  Phone:
                                </span>
                                <span>
                                  {
                                    intentSubmissions.find(
                                      (i) => `intent-${i.id}` === expandedItem
                                    ).phone
                                  }
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-2 text-foreground">
                              Form Details
                            </h3>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">
                                  Service:
                                </span>
                                <span className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                                  {intentSubmissions.find(
                                    (i) => `intent-${i.id}` === expandedItem
                                  ).service || "Urgent Consultation"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">
                                  Submitted:
                                </span>
                                <span>
                                  {intentSubmissions.find(
                                    (i) => `intent-${i.id}` === expandedItem
                                  ).createdAt
                                    ? formatDate(
                                        intentSubmissions.find(
                                          (i) =>
                                            `intent-${i.id}` === expandedItem
                                        ).createdAt
                                      )
                                    : "Recent"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {intentSubmissions.find(
                            (i) => `intent-${i.id}` === expandedItem
                          ).message && (
                            <div className="col-span-1 md:col-span-2">
                              <h3 className="font-semibold mb-2 text-foreground">
                                Message
                              </h3>
                              <div className="bg-muted/50 p-4 rounded-lg border border-gray-200">
                                {
                                  intentSubmissions.find(
                                    (i) => `intent-${i.id}` === expandedItem
                                  ).message
                                }
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <DialogFooter>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            const id = parseInt(
                              expandedItem.replace("intent-", "")
                            );
                            setExpandedItem(null);
                            deleteIntentMutation.mutate(id);
                          }}
                          className="text-destructive-foreground"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setExpandedItem(null)}
                          className="text-foreground"
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
                  <h2 className="text-xl font-semibold text-foreground">
                    Contact Submissions
                  </h2>

                  {!isLoadingContacts &&
                    !isContactError &&
                    filteredContacts.length > 0 && (
                      <CSVLink
                        data={filterByDateRange(
                          filteredContacts,
                          startDate,
                          endDate
                        ).map((contact) => ({
                          ID: contact.id,
                          Name: contact.name,
                          Phone: contact.phone,
                          Email: contact.email || "",
                          Service: contact.service || "General",
                          Message: contact.message || "",
                          Consent: contact.consent ? "Yes" : "No",
                          "Created At": contact.createdAt
                            ? formatDate(contact.createdAt)
                            : "",
                        }))}
                        filename={`contacts-${startDate || "all"}-to-${
                          endDate || "all"
                        }.csv`}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-secondary"
                      >
                        <Download className="h-4 w-4" />
                        Export CSV
                      </CSVLink>
                    )}
                </div>

                {isLoadingContacts ? (
                  <div className="text-center py-12">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                    <p className="mt-2 text-muted-foreground">
                      Loading contact submissions...
                    </p>
                  </div>
                ) : isContactError ? (
                  <div className="text-center py-12 text-destructive">
                    Error loading contact submissions. Please try again.
                  </div>
                ) : filteredContacts.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    {searchTerm
                      ? "No contacts match your search."
                      : "No contact form submissions yet."}
                  </div>
                ) : (
                  <div className="overflow-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-gray-200 px-4 py-2 text-left text-foreground">
                            Name
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-left text-foreground">
                            Email
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-left text-foreground">
                            Phone
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-left text-foreground">
                            Service
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-left text-foreground">
                            Date
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-center text-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {getPaginatedData(
                          sortByDate(
                            filterByDateRange(
                              filteredContacts,
                              startDate,
                              endDate
                            ),
                            sortOrder
                          )
                        ).map((contact, index) => (
                          <tr
                            key={contact._uniqueKey}
                            className="hover:bg-muted/50"
                          >
                            <td className="border border-gray-200 px-4 py-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="font-semibold text-muted-foreground text-xs">
                                    {contact.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <span>{contact.name}</span>
                              </div>
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                              {contact.email}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                              {contact.phone}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                              <span className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                                {contact.service || "Contact Request"}
                              </span>
                            </td>
                            <td className="border border-gray-200 px-4 py-2 text-sm text-foreground">
                              {contact.createdAt
                                ? formatDate(contact.createdAt)
                                : "Recent"}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                              <div className="flex justify-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    toggleExpand(`contact-${contact.id}`)
                                  }
                                  className="text-foreground border-foreground hover:bg-muted hover:text-primary"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-destructive border-destructive/50 hover:bg-destructive/10"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Are you sure you want to delete this
                                        contact?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete the contact form from{" "}
                                        {COMPANY_NAME}'s database.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() =>
                                          deleteContactMutation.mutate(
                                            contact.id
                                          )
                                        }
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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

                    <Pagination
                      totalItems={
                        sortByDate(
                          filterByDateRange(
                            filteredContacts,
                            startDate,
                            endDate
                          ),
                          sortOrder
                        ).length
                      }
                    />
                  </div>
                )}

                {expandedItem && expandedItem.startsWith("contact-") && (
                  <Dialog
                    open={
                      expandedItem !== null &&
                      expandedItem.startsWith("contact-")
                    }
                    onOpenChange={(open) => !open && setExpandedItem(null)}
                  >
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Contact Submission Details</DialogTitle>
                      </DialogHeader>

                      {contactSubmissions.find(
                        (c) => `contact-${c.id}` === expandedItem
                      ) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                          <div>
                            <h3 className="font-semibold mb-2 text-foreground">
                              Contact Information
                            </h3>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">
                                  Name:
                                </span>
                                <span>
                                  {
                                    contactSubmissions.find(
                                      (c) => `contact-${c.id}` === expandedItem
                                    ).name
                                  }
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">
                                  Phone:
                                </span>
                                <span>
                                  {
                                    contactSubmissions.find(
                                      (c) => `contact-${c.id}` === expandedItem
                                    ).phone
                                  }
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">
                                  Email:
                                </span>
                                <span>
                                  {
                                    contactSubmissions.find(
                                      (c) => `contact-${c.id}` === expandedItem
                                    ).email
                                  }
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-2 text-foreground">
                              Submission Details
                            </h3>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">
                                  Service:
                                </span>
                                <span className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                                  {contactSubmissions.find(
                                    (c) => `contact-${c.id}` === expandedItem
                                  ).service || "Contact Request"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">
                                  Submitted:
                                </span>
                                <span>
                                  {contactSubmissions.find(
                                    (c) => `contact-${c.id}` === expandedItem
                                  ).createdAt
                                    ? formatDate(
                                        contactSubmissions.find(
                                          (c) =>
                                            `contact-${c.id}` === expandedItem
                                        ).createdAt
                                      )
                                    : "Recent"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">
                                  Consent:
                                </span>
                                <span>
                                  {contactSubmissions.find(
                                    (c) => `contact-${c.id}` === expandedItem
                                  ).consent
                                    ? "Yes"
                                    : "No"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {contactSubmissions.find(
                            (c) => `contact-${c.id}` === expandedItem
                          ).message && (
                            <div className="col-span-1 md:col-span-2">
                              <h3 className="font-semibold mb-2 text-foreground">
                                Message
                              </h3>
                              <div className="bg-muted/50 p-4 rounded-lg border border-gray-200">
                                {
                                  contactSubmissions.find(
                                    (c) => `contact-${c.id}` === expandedItem
                                  ).message
                                }
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <DialogFooter>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            const id = parseInt(
                              expandedItem.replace("contact-", "")
                            );
                            setExpandedItem(null);
                            deleteContactMutation.mutate(id);
                          }}
                          className="text-destructive-foreground"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setExpandedItem(null)}
                          className="text-foreground"
                        >
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
