import { useState, useEffect } from "react";
import { Link } from "wouter";
import { PRODUCT_CATEGORIES, FEATURED_PRODUCTS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Product, ProductCategory } from "@/types";

// Generate more products based on the featured ones
const generateMoreProducts = () => {
  const products: Product[] = [...FEATURED_PRODUCTS];
  
  // Create variations of the featured products to simulate more products
  for (let i = 0; i < 20; i++) {
    const baseProd = FEATURED_PRODUCTS[i % FEATURED_PRODUCTS.length];
    products.push({
      ...baseProd,
      id: FEATURED_PRODUCTS.length + i + 1,
      name: `${baseProd.name} ${i % 3 === 0 ? 'Premium' : i % 3 === 1 ? 'Plus' : 'Advanced'}`,
      price: baseProd.price + (i * 100) % 500,
      isBestseller: i % 10 === 0,
      isNew: i % 7 === 0,
      rating: Math.min(5, baseProd.rating - 0.1 + Math.random() * 0.3)
    });
  }
  
  return products;
};

const ALL_PRODUCTS = generateMoreProducts();

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  
  useEffect(() => {
    document.title = "Our Products | OM Vinayaga Associates";
    setCurrentPage(1); // Reset to first page when category changes
  }, [activeCategory, searchTerm]);
  
  // Filter products based on search term and category
  const filteredProducts = ALL_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Paginate products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="pt-24">
      <section className="bg-[#2b4c7e] py-20 relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-4">Our Products</h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-200">
              Premium quality construction chemicals and building solutions
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="w-full md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-28">
                <h2 className="font-bold text-xl mb-4">Categories</h2>
                <div className="space-y-2">
                  {PRODUCT_CATEGORIES.map((category: ProductCategory) => (
                    <button 
                      key={category.id}
                      className={cn(
                        "w-full text-left py-2 px-3 rounded-md transition text-sm font-medium",
                        activeCategory === category.id 
                          ? "bg-primary text-white" 
                          : "hover:bg-gray-100 text-gray-600"
                      )}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                      {activeCategory === category.id && (
                        <i className="fas fa-check ml-2"></i>
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h2 className="font-bold text-xl mb-4">Search Products</h2>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search by name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-primary/10 rounded-lg">
                  <h3 className="font-bold text-primary mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Our experts are available to help you choose the right products for your building needs.
                  </p>
                  <a 
                    href="tel:+919342968038" 
                    className="inline-flex items-center text-primary font-medium text-sm hover:underline"
                  >
                    <i className="fas fa-phone-alt mr-2"></i> Contact our team
                  </a>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="w-full md:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-xl">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>Popularity</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating</option>
                  </select>
                </div>
              </div>
              
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <i className="fas fa-search text-gray-300 text-5xl mb-4"></i>
                  <h3 className="text-xl font-bold mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">Try changing your search criteria or browse all products</p>
                  <button 
                    onClick={() => {
                      setSearchTerm("");
                      setActiveCategory("all");
                    }}
                    className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition"
                  >
                    View All Products
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentProducts.map((product: Product) => (
                      <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden group">
                        <div className="relative h-64 overflow-hidden">
                          <div className="w-full h-full bg-gray-300 group-hover:scale-105 transition-transform duration-300"></div>
                          {product.isBestseller && (
                            <div className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded">BESTSELLER</div>
                          )}
                          {product.isNew && (
                            <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded">NEW</div>
                          )}
                        </div>
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-montserrat font-semibold text-lg">{product.name}</h3>
                            <div className="flex items-center">
                              <i className="fas fa-star text-yellow-400 text-xs"></i>
                              <span className="text-sm ml-1">{product.rating.toFixed(1)}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{product.description}</p>
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
                    ))}
                  </div>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-10 flex justify-center">
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-4 py-2 border rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <i className="fas fa-chevron-left"></i>
                        </button>
                        
                        {[...Array(totalPages)].map((_, i) => {
                          const pageNum = i + 1;
                          
                          // Show first page, last page, current page and one page before and after current
                          if (
                            pageNum === 1 || 
                            pageNum === totalPages || 
                            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                          ) {
                            return (
                              <button 
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={cn(
                                  "px-4 py-2 border rounded-md text-sm font-medium",
                                  currentPage === pageNum 
                                    ? "bg-primary text-white" 
                                    : "hover:bg-gray-50"
                                )}
                              >
                                {pageNum}
                              </button>
                            );
                          } else if (
                            pageNum === 2 || 
                            pageNum === totalPages - 1
                          ) {
                            return <span key={pageNum} className="px-4 py-2">...</span>;
                          }
                          
                          return null;
                        })}
                        
                        <button 
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="px-4 py-2 border rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <i className="fas fa-chevron-right"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Download Catalog Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-3 p-8 md:p-12">
                <h2 className="font-montserrat font-bold text-2xl md:text-3xl mb-4">Download Our Complete Product Catalog</h2>
                <p className="text-gray-600 mb-6">
                  Get detailed information about our full range of 100+ specialized building repair and maintenance products, including specifications, applications, and benefits.
                </p>
                <a 
                  href="#download-catalog" 
                  className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition"
                >
                  <i className="fas fa-download mr-2"></i> Download Catalog
                </a>
              </div>
              <div className="md:col-span-2 relative h-60 md:h-auto">
                <div className="absolute inset-0 w-full h-full bg-gray-400"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
