import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowRight, Heart, Globe, Users, Sparkles, Star, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

  interface HomePageProps {
    onNavigate: (page: string) => void;
    language: 'en' | 'hi';
  }

  export default function HomePage({ onNavigate, language }: HomePageProps) {
  const features = [
    {
      icon: Heart,
      title: 'Cultural Stories',
      description: 'AI-powered storytelling that brings traditional crafts to life with rich cultural narratives.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connect local artisans with worldwide audiences through our digital marketplace.'
    },
    {
      icon: Users,
      title: 'Artisan Community',
      description: 'Join a thriving community of traditional craftspeople preserving cultural heritage.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Artisans' },
    { number: '1000+', label: 'Unique Crafts' },
    { number: '15+', label: 'States' },
    { number: '98%', label: 'Satisfaction' }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Jaipur, Rajasthan',
      text: 'CraftLink helped me reach customers worldwide. The AI storytelling feature beautifully captures the essence of my pottery work.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c9c58e84?w=100&h=100&fit=crop'
    },
    {
      name: 'Ravi Kumar',
      location: 'Varanasi, UP',
      text: 'As a traditional weaver, I never imagined my Banarasi sarees would have such global appeal. Thank you CraftLink!',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-20 bg-gradient-to-br from-[var(--beige)] via-white to-[var(--beige)]/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <Badge className="mb-4 bg-[var(--gold)]/20 text-[var(--gold)] border-[var(--gold)]/30">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-Powered Cultural Marketplace
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Empowering
                  <span className="bg-gradient-to-r from-[var(--terracotta)] to-[var(--gold)] bg-clip-text text-transparent block">
                    Indian Artisans
                  </span>
                  Through Technology
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl">
                  Connect traditional craftspeople with global audiences through AI-powered storytelling, 
                  preserving cultural heritage while creating new opportunities.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => onNavigate('marketplace')}
                  className="bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90 text-white px-8 py-3"
                >
                  Explore Marketplace
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('upload')}
                  className="border-[var(--terracotta)] text-[var(--terracotta)] hover:bg-[var(--terracotta)]/5 px-8 py-3"
                >
                  Showcase Your Craft
                </Button>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-200">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-[var(--terracotta)]">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1716876995651-1ff85b65a6d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhcnRpc2FuJTIwY3JhZnRzJTIwcG90dGVyeXxlbnwxfHx8fDE3NTgxOTgyNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Indian artisan working on pottery"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[var(--terracotta)] flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[var(--gold)] flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">AI Stories Generated</div>
                    <div className="text-xs text-gray-500">2,450+ this month</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Preserving Culture Through Innovation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform bridges the gap between traditional craftsmanship 
              and modern digital commerce, ensuring cultural heritage thrives in the digital age.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-white to-[var(--beige)]/30">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-[var(--terracotta)]/10 rounded-xl flex items-center justify-center mb-6">
                      <feature.icon className="w-6 h-6 text-[var(--terracotta)]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--beige)]/50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Stories from Our Artisan Community
            </h2>
            <p className="text-xl text-gray-600">
              Hear from the talented craftspeople who are part of the CraftLink family
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4 mb-6">
                      <ImageWithFallback
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
                    <div className="flex mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[var(--gold)] fill-current" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--terracotta)] to-[var(--gold)]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Share Your Craft with the World?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of artisans who are preserving cultural heritage while building successful businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => onNavigate('upload')}
                className="bg-white text-[var(--terracotta)] hover:bg-gray-100 px-8 py-3"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => onNavigate('marketplace')}
                className="border-white text-white hover:bg-white/10 px-8 py-3"
              >
                Browse Marketplace
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}