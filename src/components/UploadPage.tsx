import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Upload, Image as ImageIcon, Sparkles, Globe, MessageCircle, CheckCircle, Loader } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface UploadPageProps {
  onNavigate: (page: string) => void;
}

  interface UploadPageProps {
    onNavigate: (page: string) => void;
    language: 'en' | 'hi';
  }

  export default function UploadPage({ onNavigate, language }: UploadPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    artisanName: '',
    email: '',
    phone: '',
    location: '',
    speciality: '',
    productTitle: '',
    category: '',
    price: '',
    materials: '',
    description: ''
  });

  const [generatedContent, setGeneratedContent] = useState({
    description: '',
    culturalStory: '',
    socialCaption: '',
    translations: {
      hindi: '',
      bengali: '',
      tamil: ''
    }
  });

  const categories = ['Pottery', 'Textiles', 'Jewelry', 'Woodwork', 'Metalwork', 'Paintings'];
  const specialities = ['Blue Pottery', 'Banarasi Silk Weaving', 'Kundan Jewelry', 'Block Printing', 'Madhubani Painting'];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation with mock content
    setTimeout(() => {
      setGeneratedContent({
        description: `Beautiful handcrafted ${formData.category.toLowerCase()} piece showcasing traditional Indian artistry. Made with authentic materials and techniques passed down through generations.`,
        culturalStory: `This exquisite ${formData.category.toLowerCase()} represents the rich cultural heritage of ${formData.location}. The intricate patterns and techniques used in creating this piece have been preserved for centuries, telling the story of skilled artisans who have dedicated their lives to maintaining these traditional crafts. Each element of the design carries symbolic meaning, from the colors that represent prosperity and spirituality to the motifs that connect us to our ancestral traditions.`,
        socialCaption: `✨ Discover the beauty of traditional Indian craftsmanship! This stunning ${formData.category.toLowerCase()} from ${formData.location} tells a story of heritage and artistry. #TraditionalCrafts #IndianArt #CraftLink #HandmadeWithLove`,
        translations: {
          hindi: `यह सुंदर ${formData.category} ${formData.location} की पारंपरिक कलाकृति का प्रतिनिधित्व करता है।`,
          bengali: `এই সুন্দর ${formData.category} ${formData.location} এর ঐতিহ্যবাহী শিল্পকর্মের প্রতিনিধিত্ব করে।`,
          tamil: `இந்த அழகான ${formData.category} ${formData.location} இன் பாரம்பரிய கலையை பிரதிநிதித்துவப்படுத்துகிறது।`
        }
      });
      setIsGenerating(false);
      setCurrentStep(3);
    }, 3000);
  };

  const steps = [
    { number: 1, title: 'Artisan Details', description: 'Tell us about yourself' },
    { number: 2, title: 'Upload Craft', description: 'Share your creation' },
    { number: 3, title: 'AI Magic', description: 'Generated content' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--beige)]/30 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Showcase Your Beautiful Craft
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your traditional craft with the world and let AI help tell its cultural story
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= step.number
                      ? 'bg-[var(--terracotta)] border-[var(--terracotta)] text-white'
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="text-center mt-2">
                    <div className="font-medium text-gray-900">{step.title}</div>
                    <div className="text-sm text-gray-500">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${
                    currentStep > step.number ? 'bg-[var(--terracotta)]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Artisan Details */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Tell Us About Yourself</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="artisanName">Full Name *</Label>
                    <Input
                      id="artisanName"
                      value={formData.artisanName}
                      onChange={(e) => setFormData({...formData, artisanName: e.target.value})}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="City, State"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="speciality">Your Craft Speciality *</Label>
                  <Select value={formData.speciality} onValueChange={(value) => setFormData({...formData, speciality: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your speciality" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialities.map(speciality => (
                        <SelectItem key={speciality} value={speciality}>{speciality}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => setCurrentStep(2)}
                    disabled={!formData.artisanName || !formData.email || !formData.location}
                    className="bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90"
                  >
                    Continue to Upload
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Upload Craft */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Upload Your Craft</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Image Upload */}
                <div>
                  <Label>Craft Photo *</Label>
                  <div className="mt-2">
                    {!uploadedImage ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-[var(--terracotta)] transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">Click to upload or drag and drop</p>
                          <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                        </label>
                      </div>
                    ) : (
                      <div className="relative">
                        <ImageWithFallback
                          src={uploadedImage}
                          alt="Uploaded craft"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setUploadedImage(null)}
                          className="absolute top-2 right-2"
                        >
                          Change Image
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="productTitle">Product Title *</Label>
                    <Input
                      id="productTitle"
                      value={formData.productTitle}
                      onChange={(e) => setFormData({...formData, productTitle: e.target.value})}
                      placeholder="e.g., Traditional Blue Pottery Vase"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="2500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="materials">Materials Used</Label>
                    <Input
                      id="materials"
                      value={formData.materials}
                      onChange={(e) => setFormData({...formData, materials: e.target.value})}
                      placeholder="e.g., Clay, natural dyes, gold leaf"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Brief Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Tell us about your craft, techniques used, and what makes it special..."
                    rows={4}
                  />
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleGenerateContent}
                    disabled={!uploadedImage || !formData.productTitle || !formData.category}
                    className="bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate AI Content
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: AI Generated Content */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {isGenerating ? (
              <Card className="p-12">
                <div className="text-center">
                  <Loader className="w-12 h-12 text-[var(--terracotta)] animate-spin mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">AI is Working Its Magic!</h3>
                  <p className="text-gray-600 mb-6">
                    Our AI is analyzing your craft and generating culturally rich content...
                  </p>
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[var(--terracotta)] rounded-full animate-pulse"></div>
                      <span>Analyzing image</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[var(--gold)] rounded-full animate-pulse"></div>
                      <span>Generating story</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[var(--terracotta)] rounded-full animate-pulse"></div>
                      <span>Creating translations</span>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    🎉 Your AI-Powered Content is Ready!
                  </h2>
                  <p className="text-gray-600">
                    Review and customize the generated content for your craft listing
                  </p>
                </div>

                {/* Enhanced Description */}
                <Card className="p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-8 h-8 bg-[var(--terracotta)]/10 rounded-full flex items-center justify-center">
                      <ImageIcon className="w-4 h-4 text-[var(--terracotta)]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Enhanced Product Description</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700">{generatedContent.description}</p>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3">
                        Edit Description
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Cultural Story */}
                <Card className="p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-8 h-8 bg-[var(--gold)]/10 rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-[var(--gold)]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Cultural Story</h3>
                      <div className="bg-gradient-to-br from-[var(--beige)]/30 to-white p-4 rounded-lg">
                        <p className="text-gray-700 leading-relaxed">{generatedContent.culturalStory}</p>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3">
                        Customize Story
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Social Media Caption */}
                <Card className="p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Social Media Caption</h3>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-gray-700">{generatedContent.socialCaption}</p>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3">
                        Copy Caption
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Translations */}
                <Card className="p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Globe className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Multi-Language Translations</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Badge className="mb-2 bg-orange-100 text-orange-800">Hindi</Badge>
                          <div className="bg-orange-50 p-3 rounded-lg text-sm">
                            {generatedContent.translations.hindi}
                          </div>
                        </div>
                        <div>
                          <Badge className="mb-2 bg-blue-100 text-blue-800">Bengali</Badge>
                          <div className="bg-blue-50 p-3 rounded-lg text-sm">
                            {generatedContent.translations.bengali}
                          </div>
                        </div>
                        <div>
                          <Badge className="mb-2 bg-green-100 text-green-800">Tamil</Badge>
                          <div className="bg-green-50 p-3 rounded-lg text-sm">
                            {generatedContent.translations.tamil}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                  >
                    Back to Edit
                  </Button>
                  <div className="space-x-4">
                    <Button
                      variant="outline"
                      className="border-[var(--terracotta)] text-[var(--terracotta)]"
                    >
                      Save as Draft
                    </Button>
                    <Button
                      className="bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90"
                      onClick={() => {
                        // Simulate success and redirect
                        setTimeout(() => onNavigate('marketplace'), 1000);
                      }}
                    >
                      Publish to Marketplace
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}