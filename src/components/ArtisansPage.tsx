import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, MapPin, Star, Calendar, Award, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { mockArtisans, mockProducts } from '../lib/mock-data';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ArtisansPageProps {
  onNavigate: (page: string, artisanId?: string) => void;
  selectedArtisanId?: string;
}

  interface ArtisansPageProps {
    onNavigate: (page: string) => void;
    selectedArtisanId?: string;
    language: 'en' | 'hi';
  }

  export default function ArtisansPage({ onNavigate, selectedArtisanId, language }: ArtisansPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('all');
  const [selectedArtisan, setSelectedArtisan] = useState(
    selectedArtisanId ? mockArtisans.find(a => a.id === selectedArtisanId) : null
  );
  const [sortBy, setSortBy] = useState<'rating' | 'sales' | 'default'>('default');

  const specialities = ['all', 'Blue Pottery', 'Banarasi Silk Weaving', 'Kundan Jewelry'];

  const filteredArtisans = mockArtisans.filter(artisan => {
    const matchesSearch = artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artisan.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artisan.speciality.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpeciality = selectedSpeciality === 'all' || artisan.speciality === selectedSpeciality;
    return matchesSearch && matchesSpeciality;
  });

  const sortedArtisans = [...filteredArtisans];
  if (sortBy === 'rating') {
    sortedArtisans.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'sales') {
    sortedArtisans.sort((a, b) => b.totalSales - a.totalSales);
  }

  const getArtisanProducts = (artisanId: string) => {
    return mockProducts.filter(product => product.artisanId === artisanId);
  };

  if (selectedArtisan) {
    const artisanProducts = getArtisanProducts(selectedArtisan.id);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--beige)]/30 to-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => setSelectedArtisan(null)}
            className="mb-6"
          >
            ← Back to All Artisans
          </Button>

          {/* Artisan Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-8 mb-8 bg-gradient-to-br from-white to-[var(--beige)]/30">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <ImageWithFallback
                    src={selectedArtisan.image}
                    alt={selectedArtisan.name + ' profile photo'}
                    className="w-48 h-48 rounded-full object-cover mx-auto mb-6 shadow-lg"
                  />
                  <div className="flex items-center justify-center space-x-1 mb-4">
                    <Star className="w-5 h-5 text-[var(--gold)] fill-current" aria-label="Rating" />
                    <span className="font-medium text-lg">{selectedArtisan.rating}</span>
                    <span className="text-gray-500">(45 reviews)</span>
                  </div>
                  <Badge className="bg-[var(--terracotta)]/10 text-[var(--terracotta)] border-[var(--terracotta)]/30 mb-4">
                    <Award className="w-3 h-3 mr-1" />
                    Master Artisan
                  </Badge>
                  {/* Contact/Social Info */}
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Contact & Social</h4>
                    <div className="text-gray-700 text-sm">
                      <span>Email: </span>
                      <a href={`mailto:${selectedArtisan.email || 'info@craftlink.com'}`} className="text-[var(--terracotta)] underline">
                        {selectedArtisan.email || 'info@craftlink.com'}
                      </a>
                    </div>
                    <div className="text-gray-700 text-sm mt-1">
                      <span>Instagram: </span>
                      <a href={selectedArtisan.instagram || 'https://instagram.com/craftlink'} target="_blank" rel="noopener noreferrer" className="text-[var(--terracotta)] underline">
                        {selectedArtisan.instagram || '@craftlink'}
                      </a>
                    </div>
                    <div className="mt-4 flex justify-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => window.open(`mailto:${selectedArtisan.email || 'info@craftlink.com'}`)}
                        aria-label={`Contact ${selectedArtisan.name}`}
                      >
                        Contact Artisan
                      </Button>
                      <Button
                        variant="default"
                        onClick={() => window.open(`https://instagram.com/${selectedArtisan.instagram?.replace('@','') || 'craftlink'}`,'_blank')}
                        aria-label={`Follow ${selectedArtisan.name} on Instagram`}
                      >
                        Follow on Instagram
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{selectedArtisan.name}</h1>
                    <p className="text-xl text-[var(--terracotta)] font-medium mb-4">{selectedArtisan.speciality}</p>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedArtisan.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {new Date(selectedArtisan.joinDate).getFullYear()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>₹{selectedArtisan.totalSales.toLocaleString()} total sales</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">About</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">{selectedArtisan.bio}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Cultural Heritage</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedArtisan.culturalBackground}</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Artisan's Products */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {selectedArtisan.name}'s Crafts ({artisanProducts.length})
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artisanProducts.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500">
                  <p>No products found for this artisan yet.</p>
                </div>
              ) : (
                artisanProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="cursor-pointer"
                    onClick={() => onNavigate('product-detail', product.id)}
                  >
                    <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="relative">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.title + ' product image'}
                          className="w-full h-48 object-cover"
                        />
                        <Badge className="absolute top-3 left-3 bg-[var(--terracotta)]/90 text-white">
                          {product.category}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{product.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.shortStory}</p>
                        {/* Product tags */}
                        <div className="flex flex-wrap gap-2 mb-2">
                          {product.tags.map(tag => (
                            <Badge key={tag} className="bg-[var(--gold)]/10 text-[var(--gold)] border-[var(--gold)]/30">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        {/* Product translations */}
                        <div className="mb-2">
                          {product.translations && (
                            <div className="text-xs text-gray-500">
                              {product.translations.hindi && <div>Hindi: {product.translations.hindi}</div>}
                              {product.translations.bengali && <div>Bengali: {product.translations.bengali}</div>}
                              {product.translations.tamil && <div>Tamil: {product.translations.tamil}</div>}
                            </div>
                          )}
                        </div>
                        {/* Social media caption */}
                        <div className="mb-2 text-xs text-gray-400 italic">
                          {product.socialMediaCaption}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xl font-bold text-[var(--terracotta)]">
                            ₹{product.price.toLocaleString()}
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-[var(--gold)] fill-current" />
                            <span className="text-sm">4.8</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </motion.section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--beige)]/30 to-white">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Talented Artisans
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover the masters behind the beautiful crafts, each with their own unique story and cultural heritage.
            </p>
            
            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search artisans by name, location, or craft..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedSpeciality} onValueChange={setSelectedSpeciality}>
                <SelectTrigger className="w-60">
                  <SelectValue placeholder="Filter by speciality" />
                </SelectTrigger>
                <SelectContent>
                  {specialities.map(speciality => (
                    <SelectItem key={speciality} value={speciality}>
                      {speciality === 'all' ? 'All Specialities' : speciality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Artisans Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Sorting options */}
          <div className="flex justify-end mb-6">
            <Select value={sortBy} onValueChange={(v: string) => setSortBy(v as 'rating' | 'sales' | 'default')}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort artisans" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="sales">Most Sales</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedArtisans.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                <p>No artisans found matching your search or filter.</p>
              </div>
            ) : (
              sortedArtisans.map((artisan, index) => (
                <motion.div
                  key={artisan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedArtisan(artisan)}
                >
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 bg-white">
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="h-64 bg-gradient-to-br from-[var(--terracotta)]/10 to-[var(--gold)]/10 flex items-center justify-center">
                          <ImageWithFallback
                            src={artisan.image}
                            alt={artisan.name + ' profile photo'}
                            className="w-32 h-32 rounded-full object-cover shadow-lg"
                          />
                        </div>
                        <Badge className="absolute top-4 right-4 bg-[var(--terracotta)]/90 text-white">
                          <Award className="w-3 h-3 mr-1" />
                          Master
                        </Badge>
                      </div>
                      
                      <div className="p-6 space-y-4">
                        <div className="text-center">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{artisan.name}</h3>
                          <p className="text-[var(--terracotta)] font-medium">{artisan.speciality}</p>
                          <div className="flex items-center justify-center space-x-1 mt-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{artisan.location}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm text-center line-clamp-3">
                          {artisan.bio}
                        </p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-[var(--gold)] fill-current" />
                            <span className="font-medium">{artisan.rating}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {getArtisanProducts(artisan.id).length} products
                          </div>
                          <div className="text-sm text-gray-600">
                            ₹{(artisan.totalSales / 1000).toFixed(0)}k sales
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Preserving Cultural Heritage
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each artisan carries forward centuries of tradition, keeping ancient crafts alive for future generations.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Generational Craftsmanship',
                description: 'Many of our artisans represent the 4th or 5th generation in their family craft traditions.',
                stat: '85%',
                label: 'Multi-generational artisans'
              },
              {
                title: 'Cultural Preservation',
                description: 'Through CraftLink, traditional techniques are documented and shared with global audiences.',
                stat: '500+',
                label: 'Cultural stories preserved'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[var(--terracotta)] mb-2">{item.stat}</div>
                    <div className="text-sm text-gray-500 mb-4">{item.label}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}