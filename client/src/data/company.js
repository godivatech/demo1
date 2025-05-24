export const COMPANY_NAME = "OM Vinayaga Associates";
export const COMPANY_TITLE = "Building Doctor Franchise";
export const COMPANY_DESCRIPTION =
  "Your trusted partner for all building repair and maintenance needs in Madurai and surrounding areas.";

export const CONTACT = {
  addresses: [
    "No. 6, North Gate, Near Balaji Gas, S.S. Colony, Madurai",
    "Door No. 131, Shop No. 12, Kallazhagar Complex, Thallakulam Main Road, Madurai",
  ],
  address: "No. 6, North Gate, Near Balaji Gas, S.S. Colony, Madurai", // Keeping for backward compatibility
  phone: ["+91 81900 90059", "+91 78737 32323"],
  email: "omvinayagaassociates@gmail.com",
  director: "Er. Ramesh Jeyaraman",
  workingHours: "Monday to Saturday from 09.30 am to 07.30 pm",
  whatsapp: "https://wa.link/iu1g4q",
};

export const SOCIAL_MEDIA = {
  facebook: "https://www.facebook.com/buildingdr",
  instagram: "https://www.instagram.com/building_doctor_madurai/",
  youtube: "https://youtube.com/buildingdoctor",
  twitter: "https://twitter.com/buildingdoctor3?lang=en",
};

export const STATS = [
  {
    id: 1,
    value: "1000+",
    label: "Projects Completed",
  },
  {
    id: 2,
    value: "30+",
    label: "Outlets",
  },
  {
    id: 3,
    value: "75+",
    label: "Services",
  },
  {
    id: 4,
    value: "85+",
    label: "Products",
  },
  {
    id: 5,
    value: "200+",
    label: "Applicators",
  },
  {
    id: 6,
    value: "10+",
    label: "Years of Excellence",
  },
  {
    id: 7,
    value: "10000+",
    label: "Happy Customers",
  },
  {
    id: 8,
    value: "1M+",
    label: "Sq.ft Protected",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Kiran",
    location: "Madambakkam",
    rating: 5,
    content:
      "Building Doctor resolved our longstanding leakage issues quickly and efficiently. Their team was professional and provided excellent service from start to finish.",
    hasVideo: true,
  },
  {
    id: 2,
    name: "Paari",
    location: "Tambaram-Mudichur",
    rating: 4.8,
    content:
      "I was impressed with Building Doctor's innovative solutions for my old property. Their expertise in waterproofing helped save my building from further deterioration.",
    hasVideo: true,
  },
  {
    id: 3,
    name: "Krishnamoorthy",
    location: "KK Nagar",
    rating: 5,
    content:
      "The quality of materials and technical knowledge of the Building Doctor team is exceptional. They resolved our complex structural issues with minimal disruption.",
    hasVideo: true,
  },
];

export const FAQS = [
  {
    id: 1,
    question: "What are the causes of building cracks?",
    answer:
      "Building cracks can occur due to various reasons such as foundation settlement, temperature changes, moisture, and structural issues. These factors can lead to stress on the building materials, resulting in cracks forming over time. Regular maintenance and addressing underlying issues promptly can help prevent and mitigate the impact of cracks on buildings.",
  },
  {
    id: 2,
    question: "What are the common reasons for leakages in roofs?",
    answer:
      "Cracks in the terrace surface, damaged or improperly installed waterproofing membranes, gaps or deterioration around edges and joints, and insufficient drainage leading to water pooling are common causes of roof leakages.",
  },
  {
    id: 3,
    question: "What are some effective ways to stop roof leaks?",
    answer:
      "Inspect terrace often for damage. Seal cracks with waterproof material. Ensure proper drainage and seal joints tightly. Consider professional help if leaks persist.",
  },
  {
    id: 4,
    question:
      "What are the different types of waterproofing methods available?",
    answer:
      "There are several waterproofing methods available, including membrane systems, cementitious coatings, liquid waterproofing membranes, pressure grouting, and crystalline waterproofing. Each method offers unique advantages and is applied depending on factors like the structure, budget, and environmental conditions.",
  },
  {
    id: 5,
    question:
      "What are the key benefits of using Building Doctor products for construction and renovation projects?",
    answer:
      "Building Doctor products offer several key benefits including superior quality, ease of application, durability, and effective protection against common issues like corrosion, leakage, and tile joint damage. Additionally, they provide solutions tailored to specific construction needs, ensuring long-lasting and reliable results.",
  },
  {
    id: 6,
    question:
      "How do Building Doctor products contribute to sustainable construction practices?",
    answer:
      "Building Doctor products are designed with sustainability in mind, offering features such as low VOC (Volatile Organic Compounds) content, long-term durability, and compatibility with green building standards. By promoting efficient use of resources and reducing the need for frequent repairs or replacements, they support sustainable construction practices.",
  },
];

export const BENEFITS = [
  {
    id: 1,
    title: "Expert Consultation",
    description:
      "Our team of experienced professionals provides expert advice tailored to your specific building needs.",
    icon: "clipboard-list",
  },
  {
    id: 2,
    title: "Quality Products",
    description:
      "We use only high-quality, tested materials that ensure long-lasting and effective solutions.",
    icon: "star",
  },
  {
    id: 3,
    title: "Cost-Effective Solutions",
    description:
      "Our solutions are designed to be affordable while delivering excellent results, helping you save money in the long run.",
    icon: "dollar-sign",
  },
  {
    id: 4,
    title: "Quick Turnaround",
    description:
      "We work efficiently to minimize disruption to your daily activities, completing projects on time.",
    icon: "clock",
  },
  {
    id: 5,
    title: "Comprehensive Warranty",
    description:
      "Our services come with a warranty, giving you peace of mind and assurance of quality workmanship.",
    icon: "shield",
  },
  {
    id: 6,
    title: "After-Service Support",
    description:
      "We provide ongoing support and assistance even after the completion of the project.",
    icon: "headphones",
  },
];

// Import images directly from assets directory to ensure compatibility with production builds
import terraceBeforeImg from "../assets/terrace_before.jpg";
import terraceAfterImg from "../assets/terrace_after.jpg";
import wallBeforeImg from "../assets/before_repair.jpg";
import wallAfterImg from "../assets/after_repair.jpg";

export const BEFORE_AFTER = [
  {
    id: 1,
    title: "Terrace Waterproofing",
    description:
      "Complete solution for persistent roof leaks with our specialized waterproofing techniques.",
    beforeImage: terraceBeforeImg,
    afterImage: terraceAfterImg,
  },
  {
    id: 2,
    title: "Wall Crack Repair",
    description:
      "Effective repair of structural wall cracks using our advanced crack-filling solutions.",
    beforeImage: wallBeforeImg,
    afterImage: wallAfterImg,
  },
];
