export interface Product {
  id: string;
  title: string;
  description: string;
  culturalStory: string;
  shortStory: string;
  price: number;
  image: string;
  artisanId: string;
  category: string;
  tags: string[];
  socialMediaCaption: string;
  translations: {
    hindi?: string;
    bengali?: string;
    tamil?: string;
  };
}

export interface Artisan {
  id: string;
  name: string;
  bio: string;
  culturalBackground: string;
  location: string;
  speciality: string;
  joinDate: string;
  image: string;
  products: string[]; // product IDs
  totalSales: number;
  rating: number;
  email?: string;
  instagram?: string;
}

export interface DashboardStats {
  totalViews: number;
  totalSales: number;
  topProducts: { name: string; views: number }[];
  trendingCrafts: string[];
  recentOrders: { product: string; date: string; amount: number }[];
}

export const mockArtisans: Artisan[] = [
  {
    id: "1",
    name: "Priya Sharma",
    bio: "Master potter from Rajasthan with 15 years of experience in traditional blue pottery.",
    culturalBackground: "Born in Jaipur, Priya learned the ancient art of blue pottery from her grandmother. This craft, originally brought from Persia, has been passed down through generations in her family.",
    location: "Jaipur, Rajasthan",
    speciality: "Blue Pottery",
    joinDate: "2023-01-15",
  image: "assets/artisan1.jpg", // Provided Indian craftswoman image
    products: ["1", "2"],
    totalSales: 1250,
    rating: 4.8,
    email: "priya.sharma@craftlink.com",
    instagram: "@priyasharma.pottery"
  },
  {
    id: "2", 
    name: "Ravi Kumar",
    bio: "Traditional weaver specializing in Banarasi silk sarees with intricate gold thread work.",
    culturalBackground: "From the holy city of Varanasi, Ravi represents the 5th generation of his family's weaving tradition. His work preserves the ancient techniques of Banarasi silk weaving.",
    location: "Varanasi, Uttar Pradesh",
    speciality: "Banarasi Silk Weaving",
    joinDate: "2023-02-20",
  image: "assets/artisan2.jpg", // Provided Indian craftswoman image
    products: ["3", "4"],
    totalSales: 2100,
    rating: 4.9,
    email: "ravi.kumar@craftlink.com",
    instagram: "@ravikumar.silk"
  },
  {
    id: "3",
    name: "Lakshmi Devi",
    bio: "Expert jewelry maker creating traditional Kundan and temple jewelry pieces.",
    culturalBackground: "Hailing from the jewelry-making hub of Jodhpur, Lakshmi has mastered the art of Kundan jewelry, a technique that dates back to the Mughal era.",
    location: "Jodhpur, Rajasthan", 
    speciality: "Kundan Jewelry",
    joinDate: "2023-03-10",
  image: "assets/artisan2.jpg", // Provided Indian craftswoman image
    products: ["5", "6"],
    totalSales: 1800,
    rating: 4.7,
    email: "lakshmi.devi@craftlink.com",
    instagram: "@lakshmidevi.kundan"
  }
];

export const mockProducts: Product[] = [
  {
    id: "1",
    title: "Royal Blue Pottery Vase",
    description: "Exquisite handcrafted blue pottery vase featuring traditional Rajasthani motifs and patterns.",
    culturalStory: "This stunning blue pottery vase represents centuries of artistic tradition from Jaipur. The unique blue glaze, made from a special mixture of quartz powder, glass, and natural dyes, creates the signature azure color that has made Rajasthani pottery famous worldwide. Each piece is hand-painted with intricate floral and geometric patterns that tell stories of ancient Persian influences merged with Indian craftsmanship.",
    shortStory: "Traditional Rajasthani blue pottery with Persian-inspired motifs, representing centuries of artistic heritage.",
    price: 2500,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop",
    artisanId: "1",
    category: "Pottery",
    tags: ["handmade", "traditional", "rajasthani", "blue pottery", "home decor"],
    socialMediaCaption: "🏺 Discover the royal beauty of Rajasthani blue pottery! Each piece tells a story of ancient craftsmanship. #BlueRoyalty #TraditionalCrafts #CraftLink",
    translations: {
      hindi: "शाही नीली मिट्टी के बर्तन का फूलदान",
      bengali: "রাজকীয় নীল মৃৎশিল্পের ফুলদানি"
    }
  },
  {
    id: "2",
    title: "Decorative Pottery Bowl Set",
    description: "Set of three handcrafted pottery bowls with traditional Rajasthani designs.",
    culturalStory: "These decorative bowls showcase the timeless art of Rajasthani pottery, where each curve and pattern speaks of generations of skilled artisans. The turquoise and gold accents represent the colors of royalty, while the geometric patterns are inspired by the architectural marvels of Rajasthan's palaces and temples.",
    shortStory: "Elegant pottery bowls featuring royal Rajasthani colors and patterns passed down through generations.",
    price: 1800,
    image: "https://images.unsplash.com/photo-1610736945928-8d3d3bbf0a0b?w=500&h=400&fit=crop",
    artisanId: "1", 
    category: "Pottery",
    tags: ["pottery", "decorative", "set", "traditional", "rajasthani"],
    socialMediaCaption: "✨ Transform your home with these stunning pottery bowls! Handcrafted with love in Rajasthan. #PotteryArt #HomeDecor #CraftLink",
    translations: {
      hindi: "सजावटी मिट्टी के कटोरे का सेट",
      bengali: "আলংকারিক মৃৎপাত্রের বাটি সেট"
    }
  },
  {
    id: "3",
    title: "Pure Banarasi Silk Saree",
    description: "Magnificent Banarasi silk saree with intricate gold zari work and traditional brocade patterns.",
    culturalStory: "This exquisite Banarasi silk saree embodies the grandeur of India's textile heritage. Woven on traditional handlooms in Varanasi, each thread carries the legacy of Mughal-era craftsmanship. The intricate gold zari work, made from real metallic threads, creates patterns inspired by Mughal architecture and nature motifs. This saree takes months to complete and represents the pinnacle of Indian weaving artistry.",
    shortStory: "Luxurious Banarasi silk with gold zari work, representing centuries of weaving mastery from the holy city of Varanasi.",
    price: 15000,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&h=400&fit=crop",
    artisanId: "2",
    category: "Textiles",
    tags: ["banarasi", "silk", "saree", "gold zari", "traditional", "wedding"],
    socialMediaCaption: "👑 Grace and elegance redefined! This Banarasi silk saree is a masterpiece of Indian craftsmanship. #BanarasiSilk #TraditionalElegance #CraftLink",
    translations: {
      hindi: "शुद्ध बनारसी रेशम साड़ी",
      bengali: "খাঁটি বেনারসি রেশমের শাড়ি"
    }
  },
  {
    id: "4",
    title: "Traditional Brocade Dupatta",
    description: "Elegant brocade dupatta with gold thread work and traditional Banarasi patterns.",
    culturalStory: "This stunning brocade dupatta represents the rich textile tradition of Varanasi. The intricate patterns, woven with gold and silver threads, reflect the influence of Mughal design aesthetics. Each motif tells a story of cultural fusion, where Persian and Indian artistic elements blend seamlessly to create timeless elegance.",
    shortStory: "Elegant brocade dupatta showcasing the rich textile heritage of Varanasi with Mughal-inspired patterns.",
    price: 5500,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=400&fit=crop",
    artisanId: "2",
    category: "Textiles", 
    tags: ["brocade", "dupatta", "gold thread", "traditional", "varanasi"],
    socialMediaCaption: "✨ Add royal elegance to any outfit with this stunning brocade dupatta! #BrocadeBeauty #TraditionalFashion #CraftLink",
    translations: {
      hindi: "पारंपरिक ब्रोकेड दुपट्टा",
      bengali: "ঐতিহ্যবাহী ব্রোকেড দুপট্টা"
    }
  },
  {
    id: "5",
    title: "Kundan Polki Necklace Set",
    description: "Exquisite Kundan jewelry set featuring traditional polki diamonds and pearls.",
    culturalStory: "This magnificent Kundan necklace set represents the epitome of Mughal jewelry artistry. Kundan, meaning 'pure gold' in Sanskrit, involves setting uncut diamonds and gemstones in gold foil. This ancient technique, patronized by Mughal emperors, creates jewelry that seems to capture sunlight itself. Each piece is meticulously handcrafted, with pearls and colored gemstones arranged in patterns that have adorned Indian royalty for centuries.",
    shortStory: "Royal Kundan jewelry featuring uncut diamonds and pearls, crafted using ancient Mughal techniques.",
    price: 45000,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=400&fit=crop",
    artisanId: "3",
    category: "Jewelry",
    tags: ["kundan", "polki", "necklace", "traditional", "wedding jewelry", "diamonds"],
    socialMediaCaption: "💎 Timeless elegance meets royal tradition! This Kundan necklace set is perfect for your special day. #KundanJewelry #WeddingJewelry #CraftLink",
    translations: {
      hindi: "कुंदन पोल्की हार सेट",
      bengali: "কুন্দন পোল্কি হারের সেট"
    }
  },
  {
    id: "6",
    title: "Temple Jewelry Earrings",
    description: "Traditional South Indian temple jewelry earrings with intricate gold work and ruby stones.",
    culturalStory: "These magnificent temple jewelry earrings draw inspiration from the sacred art found in South Indian temples. The intricate gold work features motifs of deities, lotus flowers, and peacocks - symbols of prosperity and divine blessing. Originally worn by temple dancers and royal families, this style of jewelry represents the spiritual and cultural richness of South Indian heritage.",
    shortStory: "Sacred temple jewelry inspired by South Indian temple art, featuring divine motifs and precious stones.",
    price: 12000,
    image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=500&h=400&fit=crop",
    artisanId: "3",
    category: "Jewelry",
    tags: ["temple jewelry", "earrings", "south indian", "gold", "ruby", "traditional"],
    socialMediaCaption: "🕉️ Embrace divine elegance with these stunning temple jewelry earrings! #TempleJewelry #SouthIndianTradition #CraftLink",
    translations: {
      hindi: "मंदिर के गहने की बालियां",
      tamil: "கோயில் நகை காதணிகள்"
    }
  }
];

export const mockDashboardStats: DashboardStats = {
  totalViews: 12450,
  totalSales: 156000,
  topProducts: [
    { name: "Kundan Polki Necklace Set", views: 1250 },
    { name: "Pure Banarasi Silk Saree", views: 980 },
    { name: "Royal Blue Pottery Vase", views: 750 }
  ],
  trendingCrafts: ["Kundan Jewelry", "Banarasi Silk", "Blue Pottery", "Temple Jewelry"],
  recentOrders: [
    { product: "Traditional Brocade Dupatta", date: "2024-01-20", amount: 5500 },
    { product: "Temple Jewelry Earrings", date: "2024-01-19", amount: 12000 },
    { product: "Decorative Pottery Bowl Set", date: "2024-01-18", amount: 1800 }
  ]
};