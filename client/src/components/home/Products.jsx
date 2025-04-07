import { useState } from "react";
import { Link } from "wouter";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Fetch products from API
  const { data: productsData, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/products");
        return await res.json();
      } catch (error) {
        console.error("Failed to fetch products:", error);
        return { products: [] };
      }
    }
  });
  
  // Get products from API response
  const allProducts = productsData?.products || [];
  
  // Get featured products (bestsellers or new products)
  const featuredProducts = allProducts.filter(product => product.isBestseller || product.isNew).slice(0, 8);
  
  // Filter products by category
  const filteredProducts = activeCategory === "all" 
    ? featuredProducts
    : featuredProducts.filter(product => product.category === activeCategory);
  
  // Render product card
  const renderProductCard = (product) => (
    <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden group">
      <div className="relative h-64 overflow-hidden">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 group-hover:scale-105 transition-transform duration-300"></div>
        )}
        {product.isBestseller && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded">BESTSELLER</div>
        )}
        {product.isNew && (
          <div className="absolute top-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded">NEW</div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-montserrat font-semibold text-lg">{product.name}</h3>
          <div className="flex items-center">
            <i className="fas fa-star text-yellow-400 text-xs"></i>
            <span className="text-sm ml-1">{product.rating}</span>
          </div>
        </div>
        <div className="text-sm text-gray-600 mb-3">{product.description}</div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-primary">₹{product.price.toLocaleString('en-IN')}</span>
          <Link href={`/products/${product.id}`}>
            <a className="bg-primary hover:bg-primary/90 text-white px-3 py-1 rounded text-sm transition">
              View Details
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
  
  return (
    <section id="products" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-primary bg-opacity-10 rounded-full mb-3">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider">Our Products</p>
          </div>
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">Premium <span className="text-primary">Construction Chemicals</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Browse our extensive catalog of over 100 specialized building and repair products.</p>
        </div>
        
        {/* Product Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {PRODUCT_CATEGORIES.map((category) => (
              <button 
                key={category.id}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition",
                  activeCategory === category.id 
                    ? "bg-primary text-white" 
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                )}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="inline-block bg-red-100 p-4 rounded-lg">
              <p className="text-red-600">Failed to load products. Please try again later.</p>
            </div>
          </div>
        )}
        
        {/* Empty State */}
        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-block bg-gray-100 p-8 rounded-lg">
              <p className="text-gray-600">No products found in this category.</p>
              <button 
                className="mt-4 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
                onClick={() => setActiveCategory("all")}
              >
                Show all products
              </button>
            </div>
          </div>
        )}
        
        {/* Products Grid */}
        {!isLoading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => renderProductCard(product))}
          </div>
        )}
        
        {/* Browse All Products Button */}
        {!isLoading && !error && featuredProducts.length > 0 && (
          <div className="mt-12 text-center">
            <Link href="/products">
              <a className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition">
                <i className="fas fa-th-large mr-2"></i> Browse All Products
              </a>
            </Link>
          </div>
        )}
        
        {/* Product Catalog Download */}
        <div className="mt-16 bg-gray-50 rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="font-montserrat font-bold text-2xl md:text-3xl mb-4">Download Our Product Catalog</h2>
              <p className="text-gray-600 mb-6">Get detailed information about our full range of 100+ specialized building repair and maintenance products.</p>
              <a href="#" className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition">
                <i className="fas fa-download mr-2"></i> Download Catalog
              </a>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute inset-0 w-full h-full bg-gray-400"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;