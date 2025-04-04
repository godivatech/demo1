export const PRODUCT_CATEGORIES = [
  { id: "all", name: "All Products" },
  { id: "waterproofing", name: "Waterproofing" },
  { id: "admixtures", name: "Admixtures" },
  { id: "bonding-agents", name: "Bonding Agents" },
  { id: "crack-filling", name: "Crack Filling" },
  { id: "sealants", name: "Sealants" },
  { id: "tile-aids", name: "Tile Aids" },
  { id: "corrosion-treatments", name: "Corrosion Treatments" },
  { id: "thermal-insulations", name: "Thermal Insulations" }
];

export const PRODUCTS = [
  {
    id: 1,
    name: "BD WaterSeal Pro",
    description: "Premium acrylic waterproofing coating for terraces and external walls. Provides excellent protection against water leakage and has UV resistance for long-lasting performance.",
    price: 1250,
    image: "https://buildingdoctor.org/assets/products/waterseal-pro.jpg",
    rating: 4.8,
    isBestseller: true,
    isNew: false,
    category: "waterproofing"
  },
  {
    id: 2,
    name: "BD CrackFix Ultimate",
    description: "High-performance crack filling compound for structural and non-structural cracks. Bonds strongly with concrete and provides flexible, waterproof repair.",
    price: 850,
    image: "https://buildingdoctor.org/assets/products/crackfix-ultimate.jpg",
    rating: 4.7,
    isBestseller: true,
    isNew: false,
    category: "crack-filling"
  },
  {
    id: 3,
    name: "BD BathSeal Total",
    description: "Specialized waterproofing system for bathrooms and wet areas. Prevents leakage and provides protection against fungal growth.",
    price: 1450,
    image: "https://buildingdoctor.org/assets/products/bathseal-total.jpg",
    rating: 4.9,
    isBestseller: false,
    isNew: true,
    category: "waterproofing"
  },
  {
    id: 4,
    name: "BD Concrete Bond",
    description: "High-strength bonding agent for joining new concrete with old concrete. Ensures excellent adhesion and durability in construction joints.",
    price: 950,
    image: "https://buildingdoctor.org/assets/products/concrete-bond.jpg",
    rating: 4.6,
    isBestseller: false,
    isNew: false,
    category: "bonding-agents"
  },
  {
    id: 5,
    name: "BD SuperPlast",
    description: "Advanced concrete plasticizer that improves workability without adding extra water. Increases strength and durability of concrete.",
    price: 1100,
    image: "https://buildingdoctor.org/assets/products/superplast.jpg",
    rating: 4.7,
    isBestseller: false,
    isNew: false,
    category: "admixtures"
  },
  {
    id: 6,
    name: "BD TileBond Flex",
    description: "Flexible tile adhesive for interior and exterior applications. Provides excellent bonding strength for ceramic, vitrified, and natural stone tiles.",
    price: 750,
    image: "https://buildingdoctor.org/assets/products/tilebond-flex.jpg",
    rating: 4.5,
    isBestseller: false,
    isNew: false,
    category: "tile-aids"
  },
  {
    id: 7,
    name: "BD RustGuard",
    description: "Specialized treatment for preventing and treating reinforcement corrosion in concrete structures. Extends the life of buildings by protecting steel reinforcement.",
    price: 1350,
    image: "https://buildingdoctor.org/assets/products/rustguard.jpg",
    rating: 4.8,
    isBestseller: false,
    isNew: true,
    category: "corrosion-treatments"
  },
  {
    id: 8,
    name: "BD ThermoCoat",
    description: "Heat-reflective thermal insulation coating for roofs and walls. Reduces indoor temperature by up to 5-7°C and provides energy savings.",
    price: 1650,
    image: "https://buildingdoctor.org/assets/products/thermocoat.jpg",
    rating: 4.9,
    isBestseller: true,
    isNew: false,
    category: "thermal-insulations"
  },
  {
    id: 9,
    name: "BD PolyFlex Sealant",
    description: "High-performance polyurethane-based sealant for joints and gaps. Provides excellent flexibility and adhesion to various construction materials.",
    price: 890,
    image: "https://buildingdoctor.org/assets/products/polyflex-sealant.jpg",
    rating: 4.6,
    isBestseller: false,
    isNew: false,
    category: "sealants"
  },
  {
    id: 10,
    name: "BD CrystalProof",
    description: "Crystalline waterproofing system that penetrates concrete to form crystals in pores and capillaries. Provides permanent waterproofing solution.",
    price: 1450,
    image: "https://buildingdoctor.org/assets/products/crystalproof.jpg",
    rating: 4.8,
    isBestseller: false,
    isNew: true,
    category: "waterproofing"
  },
  {
    id: 11,
    name: "BD TileGrout Premium",
    description: "Water-resistant, non-shrink tile grout with anti-fungal properties. Available in multiple colors for beautiful tile joints.",
    price: 680,
    image: "https://buildingdoctor.org/assets/products/tilegrout-premium.jpg",
    rating: 4.5,
    isBestseller: false,
    isNew: false,
    category: "tile-aids"
  },
  {
    id: 12,
    name: "BD QuickSet Admix",
    description: "Rapid-setting concrete admixture for urgent repair works. Reduces setting time while maintaining workability.",
    price: 950,
    image: "https://buildingdoctor.org/assets/products/quickset-admix.jpg",
    rating: 4.7,
    isBestseller: false,
    isNew: false,
    category: "admixtures"
  },
  {
    id: 13,
    name: "BD ElastoBridge",
    description: "Elastomeric crack bridging coating for terraces and walls. Accommodates movement in the structure while providing waterproofing.",
    price: 1350,
    image: "https://buildingdoctor.org/assets/products/elastobridge.jpg",
    rating: 4.8,
    isBestseller: true,
    isNew: false,
    category: "waterproofing"
  },
  {
    id: 14,
    name: "BD MultiSeal Tape",
    description: "Self-adhesive waterproofing tape for joints, corners, and pipe penetrations. Provides instant sealing in critical areas.",
    price: 550,
    image: "https://buildingdoctor.org/assets/products/multiseal-tape.jpg",
    rating: 4.6,
    isBestseller: false,
    isNew: false,
    category: "waterproofing"
  },
  {
    id: 15,
    name: "BD EpoxyBond Strong",
    description: "High-strength epoxy-based structural adhesive for bonding concrete, metal, stone, and wood. Provides exceptional strength and durability.",
    price: 1250,
    image: "https://buildingdoctor.org/assets/products/epoxybond-strong.jpg",
    rating: 4.9,
    isBestseller: false,
    isNew: true,
    category: "bonding-agents"
  }
];

// Featured products for homepage
export const FEATURED_PRODUCTS = PRODUCTS.filter(product => product.isBestseller || product.isNew).slice(0, 6);