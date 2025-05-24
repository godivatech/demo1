import React, { useState } from 'react';
import ProductManager from '../components/admin/ProductManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Package, MessageSquare, FileText, LogOut } from 'lucide-react';
import { useLocation } from 'wouter';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    // In a real app, we would handle logout properly
    // For now, just redirect to home
    setLocation('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <Tabs 
          defaultValue="products" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto mb-8">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package size={16} />
              <span>Products</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <FileText size={16} />
              <span>Services</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span>Testimonials</span>
            </TabsTrigger>
            <TabsTrigger value="faqs" className="flex items-center gap-2">
              <FileText size={16} />
              <span>FAQs</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <ProductManager />
          </TabsContent>
          
          <TabsContent value="services">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Service Management</h2>
              <p className="text-gray-500">Service management functionality will be implemented soon.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="testimonials">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Testimonial Management</h2>
              <p className="text-gray-500">Testimonial management functionality will be implemented soon.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="faqs">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">FAQ Management</h2>
              <p className="text-gray-500">FAQ management functionality will be implemented soon.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;