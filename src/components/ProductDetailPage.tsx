import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ArrowLeft, Heart, Share2, Star, MapPin, User, Calendar, Languages, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { mockProducts, mockArtisans } from '../lib/mock-data';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: string, artisanId?: string) => void;
}

  interface ProductDetailPageProps {
    productId: string;
    onNavigate: (page: string) => void;
    language: 'en' | 'hi';
  }

  export default function ProductDetailPage({ productId, onNavigate, language }: ProductDetailPageProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = mockProducts.find(p => p.id === productId);
  const artisan = product ? mockArtisans.find(a => a.id === product.artisanId) : null;

  if (!product || !artisan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Button onClick={() => onNavigate('marketplace')}>
            Back to Marketplace
          </Button>
        </div>
      </div>
    );
  }

  const languages = [
    { code: 'english', name: 'English', content: product.culturalStory },
    ...(product.translations.hindi ? [{ code: 'hindi', name: 'हिंदी', content: product.translations.hindi }] : []),
    ...(product.translations.bengali ? [{ code: 'bengali', name: 'বাংলা', content: product.translations.bengali }] : []),
    ...(product.translations.tamil ? [{ code: 'tamil', name: 'தமிழ்', content: product.translations.tamil }] : [])
  ];

  const getCurrentContent = () => {
    const lang = languages.find(l => l.code === selectedLanguage);
    return lang?.content || product.culturalStory;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--beige)]/30 to-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={() => onNavigate('marketplace')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Marketplace
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-6 left-6">
                <Badge className="bg-[var(--terracotta)]/90 text-white">
                  {product.category}
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-[var(--gold)] fill-current" />
                  <span className="font-medium">4.8</span>
                  <span className="text-gray-500">(24 reviews)</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{artisan.location}</span>
                </div>
              </div>
              <div className="text-4xl font-bold text-[var(--terracotta)] mb-6">
                ₹{product.price.toLocaleString()}
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90 text-white flex-1"
              >
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`border-[var(--terracotta)] ${
                  isWishlisted 
                    ? 'bg-[var(--terracotta)] text-white' 
                    : 'text-[var(--terracotta)] hover:bg-[var(--terracotta)]/5'
                }`}
              >
                <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Cultural Story Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <Card className="p-8 bg-gradient-to-br from-white to-[var(--beige)]/30">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Cultural Story</h2>
              <div className="flex items-center space-x-2">
                <Languages className="w-5 h-5 text-[var(--terracotta)]" />
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-transparent border border-[var(--terracotta)]/30 rounded-md px-3 py-1 text-sm"
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {getCurrentContent()}
              </p>
            </div>
          </Card>
        </motion.section>

        {/* Artisan Profile Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Meet the Artisan</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="text-center">
                  <ImageWithFallback
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{artisan.name}</h3>
                  <p className="text-[var(--terracotta)] font-medium mb-4">{artisan.speciality}</p>
                  <div className="flex items-center justify-center space-x-1 mb-4">
                    <Star className="w-4 h-4 text-[var(--gold)] fill-current" />
                    <span className="font-medium">{artisan.rating}</span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => onNavigate('artisans', artisan.id)}
                    className="w-full border-[var(--terracotta)] text-[var(--terracotta)] hover:bg-[var(--terracotta)]/5"
                  >
                    <User className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">About</h4>
                  <p className="text-gray-700 leading-relaxed">{artisan.bio}</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Cultural Background</h4>
                  <p className="text-gray-700 leading-relaxed">{artisan.culturalBackground}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{artisan.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {new Date(artisan.joinDate).getFullYear()}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Social Media Caption */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12"
        >
          <Card className="p-8 bg-gradient-to-r from-[var(--terracotta)]/5 to-[var(--gold)]/5">
            <div className="flex items-start space-x-4">
              <MessageCircle className="w-6 h-6 text-[var(--terracotta)] mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-3">AI-Generated Social Media Caption</h3>
                <p className="text-gray-700 italic text-lg leading-relaxed">
                  {product.socialMediaCaption}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 border-[var(--terracotta)] text-[var(--terracotta)] hover:bg-[var(--terracotta)]/5"
                >
                  Copy Caption
                </Button>
              </div>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}