import { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import MarketplacePage from './components/MarketplacePage';
import ProductDetailPage from './components/ProductDetailPage';
import ArtisansPage from './components/ArtisansPage';
import UploadPage from './components/UploadPage';
import DashboardPage from './components/DashboardPage';
import AboutPage from './components/AboutPage';
import ChatBot from './components/ChatBot';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedArtisanId, setSelectedArtisanId] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const handleNavigation = (page: string, id?: string) => {
    setCurrentPage(page);
    
    if (page === 'product-detail' && id) {
      setSelectedProductId(id);
    } else {
      setSelectedProductId(null);
    }
    
    if (page === 'artisans' && id) {
      setSelectedArtisanId(id);
    } else if (page !== 'artisans') {
      setSelectedArtisanId(null);
    }
    
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} language={language} />;
      case 'marketplace':
        return <MarketplacePage onNavigate={handleNavigation} language={language} />;
      case 'product-detail':
        return selectedProductId ? (
          <ProductDetailPage 
            productId={selectedProductId} 
            onNavigate={handleNavigation} 
            language={language}
          />
        ) : (
          <MarketplacePage onNavigate={handleNavigation} language={language} />
        );
      case 'artisans':
        return (
          <ArtisansPage 
            onNavigate={handleNavigation} 
            selectedArtisanId={selectedArtisanId ?? undefined} 
            language={language}
          />
        );
      case 'upload':
        return <UploadPage onNavigate={handleNavigation} language={language} />;
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigation} language={language} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigation} language={language} />;
      default:
        return <HomePage onNavigate={handleNavigation} language={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onNavigate={handleNavigation} language={language} setLanguage={setLanguage} />
      <main>
        {renderCurrentPage()}
      </main>
      <ChatBot language={language} />
    </div>
  );
}