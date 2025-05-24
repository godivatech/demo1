import { useState } from "react";
import { Link } from "wouter";
import { PRODUCT_CATEGORIES, FEATURED_PRODUCTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  // Use hardcoded featured products from constants
  const featuredProducts = FEATURED_PRODUCTS;

  // Filter products by category
  const filteredProducts =
    activeCategory === "all"
      ? featuredProducts
      : featuredProducts.filter(
          (product) => product.category === activeCategory
        );

  // Variables for state (no longer needed with hardcoded data)
  const isLoading = false;
  const error = null;

  // Render product card with enhanced style
  const renderProductCard = (product) => (
    <div
      key={product.id}
      className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full"
    >
      <div className="relative h-64 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 transition-transform duration-500 group-hover:scale-110"></div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>

        {/* Product badges */}
        <div className="absolute top-0 left-0 right-0 flex justify-between p-4">
          {product.isBestseller && (
            <div className="px-3 py-1 bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/20">
              BESTSELLER
            </div>
          )}
          {product.isNew && (
            <div className="px-3 py-1 bg-green-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/20 ml-auto">
              NEW
            </div>
          )}
          {!product.isBestseller && !product.isNew && (
            <div className="ml-auto px-3 py-1 bg-gray-800/70 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/20">
              PRODUCT
            </div>
          )}
        </div>

        {/* Product name on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-montserrat font-bold text-lg text-white drop-shadow-md">
            {product.name}
          </h3>
        </div>
      </div>

      <div className="p-6">
        {/* Rating and price */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-yellow-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm ml-1 font-medium text-gray-700">
              {product.rating}
            </span>
          </div>
          <span className="font-bold text-lg text-primary">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Description with gradient fade */}
        <div className="relative mb-5 h-14 overflow-hidden">
          <p className="text-sm text-gray-600">{product.description}</p>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
        </div>

        {/* CTA Button */}
        <Link to={`/products/${product.id}`} className="group/btn">
          <div className="relative overflow-hidden w-full">
            <span className="block text-center bg-primary/90 hover:bg-primary text-white px-4 py-3 rounded-full text-sm font-medium transition-all cursor-pointer shadow-md hover:shadow-xl group-hover/btn:shadow-primary/20">
              View Details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline-block ml-1 transition-transform duration-300 group-hover/btn:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <section id="products" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
              />
            </svg>
            <span className="text-sm font-medium text-primary">
              Premium Solutions
            </span>
          </div>

          <h2 className="font-montserrat font-bold text-3xl md:text-5xl mb-6">
            Premium{" "}
            <span className="text-primary relative">
              Construction Chemicals
              <span className="absolute bottom-1 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
            </span>
          </h2>

          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            Browse our extensive catalog of over 100 specialized building and
            repair products engineered for lasting performance.
          </p>
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

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-block bg-gray-100 p-8 rounded-lg">
              <p className="text-gray-600">
                No products found in this category.
              </p>
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
        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => renderProductCard(product))}
          </div>
        )}

        {/* Browse All Products Button - Updated Style */}
        {featuredProducts.length > 0 && (
          <div className="mt-16 text-center">
            <Link to="/products">
              <span className="relative inline-flex group/btn">
                <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-primary/20 rounded-lg transform transition-transform group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"></span>
                <span className="relative inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-medium transition shadow-lg">
                  Browse All Products
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 transform group-hover/btn:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </span>
            </Link>
          </div>
        )}

        {/* Product Catalog Download - Enhanced Design */}
        {/*       <div className="mt-24 rounded-3xl overflow-hidden shadow-2xl relative bg-white border border-gray-100 group/cta">
           Background gradient effects 
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/70 opacity-0 group-hover/cta:opacity-5 transition-opacity duration-700"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-7 p-8 md:p-12 lg:p-16 relative">
                 Decorative accent 
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent"></div>
              
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                <span>Product Resources</span>
              </div>
              
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-gray-900 mb-6 leading-tight">
                Download Our Complete <br className="hidden md:block" /> Product Catalog
              </h2>
              
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Get detailed information about our full range of 100+ specialized building repair and maintenance products, including specifications, applications, and usage guidelines.
              </p>
              
              <a href="#" className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium transition shadow-md hover:shadow-xl group/link">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Catalog
              </a>
            </div>
            
            <div className="md:col-span-5 relative min-h-[300px] md:min-h-[400px] bg-gradient-to-tr from-gray-100 to-gray-50 hidden md:block">
                 Abstract product catalog visualization 
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-64 bg-white rounded-lg shadow-xl transform -rotate-6 transition-transform group-hover/cta:rotate-0 duration-500">
                  <div className="absolute inset-1 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-20 h-1 bg-primary/20 rounded-full mb-2"></div>
                    <div className="w-24 h-1 bg-primary/20 rounded-full mb-2"></div>
                    <div className="w-16 h-1 bg-primary/20 rounded-full mb-6"></div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="absolute w-48 h-64 bg-white rounded-lg shadow-xl transform rotate-6 translate-x-4 -translate-y-4 transition-transform group-hover/cta:rotate-0 duration-500">
                  <div className="absolute inset-1 bg-gradient-to-br from-gray-100 to-white rounded-lg border border-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Products;
