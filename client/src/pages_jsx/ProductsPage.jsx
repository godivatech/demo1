import { useState, useEffect } from "react";
import { Link } from "wouter";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// Real Building Doctor Products based on website data
export const PRODUCTS = [
  // Crack Filling Category
  {
    id: 1,
    name: "Crack Stop",
    description:
      "Standard crack filling compound for non-structural cracks in concrete and masonry surfaces.",
    price: 108,
    image:
      "https://buildingdoctor.owncart.shop/uploads/images/zxmJbde1jN-crackstop.webp",
    rating: 4.6,
    isBestseller: true,
    category: "crack-filling",
  },
  {
    id: 2,
    name: "Crack Stop X",
    description:
      "Enhanced crack filling compound for wider and deeper cracks with improved bonding properties.",
    price: 350,
    image:
      "https://buildingdoctor.owncart.shop/uploads/images/McZ-HPbYbe-crackstop%20x.webp",
    rating: 4.8,
    isBestseller: true,
    category: "crack-filling",
  },
  {
    id: 3,
    name: "Crack Stop XP",
    description:
      "Premium crack filling solution with advanced polymer technology for structural cracks and movement joints.",
    price: 460,
    image:
      "https://buildingdoctor.owncart.shop/uploads/images/gaIIbPM5-D-crackstop%20xp.webp",
    rating: 4.9,
    isBestseller: false,
    isNew: true,
    category: "crack-filling",
  },
  {
    id: 4,
    name: "Crack Stop Fibre",
    description:
      "Fiber-reinforced crack filling compound for improved tensile strength and crack resistance.",
    price: 110,
    image:
      "https://buildingdoctor.owncart.shop/uploads/images/6_-5EekNGV-crackstop%20fibre.webp",
    rating: 4.5,
    isBestseller: false,
    category: "crack-filling",
  },
  {
    id: 5,
    name: "Crack Stop Mesh",
    description:
      "Specialized crack repair mesh system for large structural cracks, used with other crack stop products.",
    price: 480,
    image:
      "https://buildingdoctor.owncart.shop/uploads/images/jFKl_rSQ_i-crackstop%20mesh.webp",
    rating: 4.7,
    isBestseller: false,
    category: "crack-filling",
  },

  // Waterproofing Category
  {
    id: 6,
    name: "Aquaseal Tank Guard",
    description:
      "Specialized waterproofing solution for water tanks and storage units, food-grade safe with anti-bacterial properties.",
    price: 1320,
    image:
      "https://buildingdoctor.owncart.shop/uploads/images/YRNCWCZic3-aqua%20seal%20tank%20guard.webp",
    rating: 4.8,
    isBestseller: true,
    category: "waterproofing",
  },
  {
    id: 7,
    name: "Instant Stop",
    description:
      "Rapid-setting waterproof plug for active water leaks and seepages, hardening in minutes.",
    price: 165,
    image:
      "https://buildingdoctor.owncart.shop/uploads/images/HJnjDJZPJ7-instastop.webp",
    rating: 4.7,
    isBestseller: false,
    category: "waterproofing",
  },

  // Thermal Insulation Category
  {
    id: 8,
    name: "Thermoshield Coat",
    description:
      "Advanced thermal insulation coating that reduces indoor temperature by reflecting solar radiation. Energy-efficient solution for roofs and exterior walls.",
    price: 3340,
    image:
      "https://buildingdoctor.owncart.shop/uploads/images/zEKKw5xPht-thermoshield-coat.webp",
    rating: 4.9,
    isBestseller: false,
    isNew: true,
    category: "thermal-insulation",
  },

  // Tapes Category
  {
    id: 9,
    name: "Seal Tape SA",
    description:
      "Self-adhesive sealing tape for joints, edges, and connections in waterproofing applications. High flexibility and durability.",
    price: 510,
    image:
      "https://buildingdoctor.owncart.shop/uploads/images/RV2zw1fIn4-seal%20tape%20sa.webp",
    rating: 4.6,
    isBestseller: false,
    category: "tapes",
  },

  // Bonding Agents Category
  {
    id: 10,
    name: "Concrete Bond",
    description:
      "High-performance bonding agent for connecting new concrete to existing surfaces. Improves adhesion and prevents delamination.",
    price: 1258,
    image:
      "https://buildingdoctor.owncart.shop/uploads/images/TctwFkJmzg-concrete-bond.webp",
    rating: 4.7,
    isBestseller: false,
    category: "bonding-agents",
  },
  {
    id: 11,
    name: "Plaster Bond SBR",
    description:
      "Styrene Butadiene Rubber (SBR) based bonding agent for plaster and mortar applications. Increases bond strength and reduces cracking.",
    price: 435,
    image:
      "https://buildingdoctor.owncart.shop/uploads/images/JzHFD30FNt-plasterbond%20sbr.webp",
    rating: 4.6,
    isBestseller: false,
    category: "bonding-agents",
  },

  // Grouts & Anchors Category
  {
    id: 12,
    name: "Nanguram Anchor Fix",
    description:
      "Professional-grade chemical anchoring system for heavy-duty fixings in concrete and masonry. High load capacity and rapid setting.",
    price: 700,
    image:
      "https://buildingdoctor.owncart.shop/uploads/images/7BJUO_YDt--nanguram%20anchorfix.webp",
    rating: 4.8,
    isBestseller: false,
    isNew: true,
    category: "grouts-anchors",
  },

  // Tiling Aids Category
  {
    id: 13,
    name: "Tile Joint Sealer Plus",
    description:
      "Premium grout sealer for tile joints with enhanced water repellency and stain resistance. Ideal for bathroom and kitchen applications.",
    price: 1386,
    image:
      "https://buildingdoctor.owncart.shop/uploads/images/m9DUUZiCks-joint%20sealer%20plus.webp",
    rating: 4.7,
    isBestseller: true,
    category: "tiling-aids",
  },
  {
    id: 14,
    name: "Tile Joint Sealer",
    description:
      "Standard grout sealer providing protection against water and stains in tile joints.",
    price: 103,
    image:
      "https://buildingdoctor.owncart.shop/uploads/images/DE0XdOIJ8Q-tile%20joint%20sealer.webp",
    rating: 4.5,
    isBestseller: false,
    category: "tiling-aids",
  },
  {
    id: 15,
    name: "BD Tile Clean Master",
    description:
      "Powerful tile and grout cleaner that removes dirt, stains, and mold from tile surfaces. Restores original appearance.",
    price: 397,
    image:
      "https://buildingdoctor.owncart.shop/uploads/images/ClPI-Orqg1-CLEANER.webp",
    rating: 4.6,
    isBestseller: false,
    category: "tiling-aids",
  },

  // Special Products Category
  {
    id: 16,
    name: "Paint Remover",
    description:
      "Effective paint and coating remover that strips multiple layers quickly without damaging the underlying surface.",
    price: 251,
    image:
      "https://buildingdoctor.owncart.shop/uploads/images/n-Z4a73w7Q-paint%20remover.webp",
    rating: 4.4,
    isBestseller: false,
    category: "special-products",
  },

  // Additional Products (to make 24 total)
  {
    id: 17,
    name: "Aqua Seal External",
    description:
      "Exterior-grade waterproofing membrane for walls exposed to harsh weather conditions. UV-resistant and breathable.",
    price: 1850,
    image:
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=500&auto=format&fit=crop",
    rating: 4.7,
    isBestseller: false,
    category: "waterproofing",
  },
  {
    id: 18,
    name: "BD Elastoseal",
    description:
      "Elastomeric waterproofing membrane for terraces and wet areas with excellent crack-bridging capabilities.",
    price: 2120,
    image:
      "https://images.unsplash.com/photo-1564182842519-8a3b2af3e228?q=80&w=500&auto=format&fit=crop",
    rating: 4.8,
    isBestseller: false,
    category: "waterproofing",
  },
  {
    id: 19,
    name: "Rust X Converter",
    description:
      "Rust converter and passivator for steel reinforcement in concrete. Converts rust to stable compounds and provides anti-corrosion protection.",
    price: 780,
    image:
      "https://images.unsplash.com/photo-1529590089485-2065eab19472?q=80&w=500&auto=format&fit=crop",
    rating: 4.6,
    isBestseller: false,
    category: "corrosion-treatments",
  },
  {
    id: 20,
    name: "ReBar Protector",
    description:
      "Protective coating for reinforcement steel to prevent corrosion in aggressive environments.",
    price: 920,
    image:
      "https://images.unsplash.com/photo-1578664182795-527956e93eef?q=80&w=500&auto=format&fit=crop",
    rating: 4.5,
    isBestseller: false,
    category: "corrosion-treatments",
  },
  {
    id: 21,
    name: "Concrete Plasticizer",
    description:
      "Water-reducing admixture that improves concrete workability without additional water, resulting in higher strength and durability.",
    price: 650,
    image:
      "https://images.unsplash.com/photo-1468774871041-fc64dd5522f3?q=80&w=500&auto=format&fit=crop",
    rating: 4.4,
    isBestseller: false,
    category: "admixtures",
  },
  {
    id: 22,
    name: "Polyurethane Sealant",
    description:
      "Flexible polyurethane sealant for expansion joints and areas subject to movement with excellent adhesion and durability.",
    price: 830,
    image:
      "https://images.unsplash.com/photo-1607400201515-c2c41c07d307?q=80&w=500&auto=format&fit=crop",
    rating: 4.7,
    isBestseller: false,
    category: "sealants",
  },
  {
    id: 23,
    name: "Silicone Sealant",
    description:
      "Premium silicone sealant for bathroom fixtures, glass, and aluminum with anti-fungal properties and UV resistance.",
    price: 550,
    image:
      "https://images.unsplash.com/photo-1582040465112-bc43d6be8028?q=80&w=500&auto=format&fit=crop",
    rating: 4.5,
    isBestseller: false,
    category: "sealants",
  },
  {
    id: 24,
    name: "Floor Leveling Compound",
    description:
      "Self-leveling compound for creating smooth, flat surfaces before installing flooring materials like tiles, carpet, or laminate.",
    price: 970,
    image:
      "https://images.unsplash.com/photo-1517581362851-d461ba2a70aa?q=80&w=500&auto=format&fit=crop",
    rating: 4.6,
    isBestseller: false,
    category: "special-products",
  },
];

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Loading state for product cards suspense effect
  const [isLoading, setIsLoading] = useState(true);
  const error = null;

  // Simulate loading delay for initial load and when category/search changes
  useEffect(() => {
    setIsLoading(true); // Set to loading whenever filters change

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Increased to 2 seconds to make it more noticeable

    return () => clearTimeout(timer);
  }, [activeCategory, searchTerm]); // Re-trigger loading when these change

  useEffect(() => {
    document.title = "Our Products | OM Vinayaga Associates";
    setCurrentPage(1); // Reset to first page when category changes
  }, [activeCategory, searchTerm]);

  // Filter products based on search term and category
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Paginate products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setIsLoading(true);
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Clear loading state after a short delay
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="pt-24">
      <section className="bg-[#2b4c7e] py-20 relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-4">
              Our Products
            </h1>
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
                  {PRODUCT_CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      className={cn(
                        "w-full text-left py-2 px-3 rounded-md transition text-sm font-medium",
                        activeCategory === category.id
                          ? "bg-primary text-white"
                          : "hover:bg-gray-100 text-gray-600"
                      )}
                      onClick={() => {
                        setIsLoading(true);
                        setActiveCategory(category.id);
                      }}
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
                      onChange={(e) => {
                        setIsLoading(true);
                        setSearchTerm(e.target.value);
                      }}
                      className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-primary/10 rounded-lg">
                  <h3 className="font-bold text-primary mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Our experts are available to help you choose the right
                    products for your building needs.
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
              {isLoading ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-xl">
                      <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Sort by:</span>
                      <div className="h-8 w-36 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
                      >
                        <div className="relative h-64 bg-gray-200"></div>
                        <div className="p-5 space-y-3">
                          <div className="flex justify-between">
                            <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
                            <div className="h-6 w-10 bg-gray-200 rounded"></div>
                          </div>
                          <div className="h-4 w-full bg-gray-200 rounded"></div>
                          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                          <div className="flex justify-between items-center pt-2">
                            <div className="h-6 w-20 bg-gray-200 rounded"></div>
                            <div className="h-8 w-24 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    Error Loading Products
                  </h3>
                  <p className="text-red-600">
                    There was an error loading the products. Please try again
                    later.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-xl">
                      {filteredProducts.length}{" "}
                      {filteredProducts.length === 1 ? "Product" : "Products"}
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
                      <h3 className="text-xl font-bold mb-2">
                        No products found
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Try changing your search criteria or browse all products
                      </p>
                      <button
                        onClick={() => {
                          setIsLoading(true);
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
                        {currentProducts.map((product) => (
                          <div
                            key={product.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden group"
                          >
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
                                <div className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded">
                                  BESTSELLER
                                </div>
                              )}
                              {product.isNew && (
                                <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded">
                                  NEW
                                </div>
                              )}
                            </div>
                            <div className="p-5">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-montserrat font-semibold text-lg">
                                  {product.name}
                                </h3>
                                <div className="flex items-center">
                                  <i className="fas fa-star text-yellow-400 text-xs"></i>
                                  <span className="text-sm ml-1">
                                    {product.rating?.toFixed(1) || "N/A"}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                {product.description}
                              </p>
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-primary">
                                  ₹{product.price?.toLocaleString("en-IN") || 0}
                                </span>
                                <Link
                                  href={`/products/${product.id}`}
                                  className="bg-primary hover:bg-primary/90 text-white px-3 py-1 rounded text-sm transition"
                                >
                                  View Details
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
                                (pageNum >= currentPage - 1 &&
                                  pageNum <= currentPage + 1)
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
                                return (
                                  <span key={pageNum} className="px-4 py-2">
                                    ...
                                  </span>
                                );
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
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Download Catalog Section */}
      {/* <section className="py-16 bg-gray-50">
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
      </section> */}
    </div>
  );
};

export default ProductsPage;
