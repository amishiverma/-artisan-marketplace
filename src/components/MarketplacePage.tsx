import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Filter, Heart, Star, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { mockProducts, mockArtisans } from '../lib/mock-data';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MarketplacePageProps {
  onNavigate: (page: string, productId?: string) => void;
  language: 'en' | 'hi';
}

  export default function MarketplacePage({ onNavigate, language }: MarketplacePageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['all', 'Pottery', 'Textiles', 'Jewelry'];
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' }
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getArtisanName = (artisanId: string) => {
    const artisan = mockArtisans.find(a => a.id === artisanId);
    return artisan?.name || 'Unknown Artisan';
  };

  const getArtisanLocation = (artisanId: string) => {
    const artisan = mockArtisans.find(a => a.id === artisanId);
    return artisan?.location || 'Unknown Location';
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4 py-8" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', borderBottom: '2px solid var(--accent)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--secondary)' }}>
              Discover Authentic Indian Crafts
            </h1>
            <p className="text-xl mb-8" style={{ color: 'var(--accent)' }}>
              Explore handcrafted treasures from talented artisans across India, each with its own unique story.
            </p>
            
            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search crafts, artisans, or materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
  <div className="max-w-7xl mx-auto px-4" style={{ background: 'var(--background)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => onNavigate('product-detail', product.id)}
              >
                <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0" style={{ background: 'var(--card)', color: 'var(--card-foreground)' }}>
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge style={{ background: 'var(--accent)', color: 'var(--accent-foreground)' }}>
                        {product.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-8 h-8 p-0 bg-white/80 hover:bg-white"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          // Handle wishlist
                        }}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Button className="bg-white text-[var(--terracotta)] hover:bg-gray-100">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-[var(--terracotta)] transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          by {getArtisanName(product.artisanId)} • {getArtisanLocation(product.artisanId)}
                        </p>
                      </div>
                      
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {product.shortStory}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                          <span className="text-sm" style={{ color: 'var(--secondary)' }}>4.8 (24)</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[var(--terracotta)]">
                            ₹{product.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {product.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs" style={{ background: 'var(--secondary)', color: 'var(--secondary-foreground)' }}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{language === 'hi' ? 'कोई शिल्प नहीं मिला' : 'No crafts found'}</h3>
              <p className="text-gray-600">{language === 'hi' ? 'अपनी खोज या फ़िल्टर मानदंड समायोजित करें' : 'Try adjusting your search or filter criteria'}</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4" style={{ background: 'var(--background)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
              {language === 'hi' ? 'शिल्प श्रेणी द्वारा खोजें' : 'Explore by Craft Category'}
            </h2>
            <p style={{ color: 'var(--secondary)' }}>
              {language === 'hi' ? 'भारतीय पारंपरिक शिल्पों की विविधता खोजें' : 'Discover the rich diversity of Indian traditional crafts'}
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[{
                name: 'Pottery',
                image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', // Jaipur blue pottery
                count: '150+ items',
                description: 'Handcrafted ceramics and earthenware'
              },
              {
                name: 'Textiles',
                image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', // Banarasi saree weaving
                count: '200+ items',
                description: 'Woven fabrics and traditional garments'
              },
              {
                name: 'Jewelry',
                image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80', // Indian jewelry
                count: '100+ items',
                description: 'Traditional ornaments and accessories'
              }
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedCategory(category.name);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300" style={{ background: 'var(--card)', color: 'var(--card-foreground)' }}>
                  <div className="relative">
                    <ImageWithFallback
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                        <p className="text-sm opacity-90">{category.count}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-gray-600 text-center">{category.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}