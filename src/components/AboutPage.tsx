import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Heart, Globe, Users, Sparkles, Target, Eye, Award, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

  interface AboutPageProps {
    onNavigate: (page: string) => void;
    language: 'en' | 'hi';
  }

  export default function AboutPage({ onNavigate, language }: AboutPageProps) {
  const values = [
    {
      icon: Heart,
      title: 'Cultural Preservation',
      description: 'We believe in preserving and celebrating the rich cultural heritage of Indian traditional crafts for future generations.'
    },
    {
      icon: Globe,
      title: 'Global Connection',
      description: 'Bridging the gap between local artisans and global audiences through technology and storytelling.'
    },
    {
      icon: Users,
      title: 'Artisan Empowerment',
      description: 'Empowering skilled craftspeople with digital tools and platforms to showcase their work and reach new markets.'
    },
    {
      icon: Sparkles,
      title: 'AI for Good',
      description: 'Using artificial intelligence to enhance cultural storytelling and preserve traditional knowledge.'
    }
  ];

  const team = [
    {
      name: 'Arjun Mehta',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      bio: 'Former tech executive passionate about preserving Indian cultural heritage through technology.'
    },
    {
      name: 'Kavya Sharma',
      role: 'Head of AI & Technology',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c9c58e84?w=200&h=200&fit=crop',
      bio: 'AI researcher specializing in natural language processing and cultural content generation.'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Artisan Relations Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
      bio: 'Third-generation craftsman turned advocate for traditional artisan communities.'
    }
  ];

  const milestones = [
    { year: '2023', event: 'CraftLink founded', description: 'Started with a vision to bridge traditional crafts and modern technology' },
    { year: '2023', event: '50 Artisans joined', description: 'Our first community of skilled craftspeople came aboard' },
    { year: '2023', event: 'AI Storytelling launched', description: 'Revolutionary AI-powered cultural story generation' },
    { year: '2024', event: '500+ Artisans', description: 'Growing community across 15 Indian states' },
    { year: '2024', event: 'Global Expansion', description: 'International shipping and multi-language support' }
  ];

  const impact = [
    { number: '500+', label: 'Artisans Empowered', description: 'Traditional craftspeople using our platform' },
    { number: '₹50L+', label: 'Revenue Generated', description: 'Total sales facilitated for artisans' },
    { number: '15', label: 'States Covered', description: 'Artisan communities across India' },
    { number: '2,500+', label: 'Cultural Stories', description: 'AI-generated stories preserving heritage' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--beige)]/30 to-white">
      {/* Hero Section */}
      <section className="relative px-4 py-20 bg-gradient-to-br from-[var(--beige)] via-white to-[var(--beige)]/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-6 bg-[var(--gold)]/20 text-[var(--gold)] border-[var(--gold)]/30 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Preserving Heritage Through Innovation
            </Badge>
            <div className="flex items-center justify-center gap-6 mb-2">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
                About
                <span className="bg-gradient-to-r from-[var(--terracotta)] to-[var(--gold)] bg-clip-text text-transparent block">
                  CraftLink
                </span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to preserve India's rich cultural heritage while empowering traditional artisans 
              to thrive in the digital age through AI-powered storytelling and global marketplace access.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1732539662019-4c4819c903db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYXJrZXRwbGFjZSUyMGJhemFhciUyMGNyYWZ0c3xlbnwxfHx8fDE3NTgyMTc0NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Indian artisan marketplace and traditional crafts"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-8">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <Target className="w-8 h-8 text-[var(--terracotta)]" />
                    <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    To create a sustainable ecosystem where traditional Indian artisans can preserve their cultural heritage 
                    while building successful businesses through AI-powered storytelling, global marketplace access, and 
                    community support.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <Eye className="w-8 h-8 text-[var(--gold)]" />
                    <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    A world where every traditional craft has a voice, every artisan has access to global opportunities, 
                    and cultural heritage is preserved and celebrated through the power of technology and human connection.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop"
                  alt="Traditional pottery making"
                  className="w-full h-48 object-cover rounded-xl"
                />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=300&fit=crop"
                  alt="Traditional textile weaving"
                  className="w-full h-48 object-cover rounded-xl mt-8"
                />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop"
                  alt="Traditional jewelry making"
                  className="w-full h-48 object-cover rounded-xl -mt-8"
                />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=300&h=300&fit=crop"
                  alt="Traditional metal work"
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-br from-[var(--beige)]/30 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do at CraftLink
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-[var(--terracotta)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-8 h-8 text-[var(--terracotta)]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              The passionate individuals behind CraftLink's mission
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-6"
                    />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-[var(--terracotta)] font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 bg-gradient-to-r from-[var(--terracotta)] to-[var(--gold)]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-xl text-white/90">
              Measuring success through the positive change we create
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {impact.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-xl text-white/90 font-medium mb-2">{stat.label}</div>
                <div className="text-white/80 text-sm">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">
              Key milestones in our mission to preserve cultural heritage
            </p>
          </motion.div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-[var(--terracotta)]/20"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <Badge className="bg-[var(--terracotta)] text-white">
                            {milestone.year}
                          </Badge>
                          <Award className="w-5 h-5 text-[var(--gold)]" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{milestone.event}</h3>
                        <p className="text-gray-600 text-sm">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[var(--terracotta)] rounded-full border-4 border-white shadow-lg"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[var(--beige)] to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Whether you're an artisan, customer, or advocate for cultural preservation, 
              there's a place for you in the CraftLink community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => onNavigate('upload')}
                className="bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90 px-8 py-3"
              >
                Become an Artisan
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => onNavigate('marketplace')}
                className="border-[var(--terracotta)] text-[var(--terracotta)] hover:bg-[var(--terracotta)]/5 px-8 py-3"
              >
                Support Our Artisans
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}