
import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, Sparkles } from 'lucide-react';
import languageLogo from '../assets/language-logo.png';


interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
}

export default function Navigation({ currentPage, onNavigate, language, setLanguage }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'artisans', label: 'Artisans' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'about', label: 'About' }
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-[var(--terracotta)]/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigate('home')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[var(--terracotta)] to-[var(--gold)] rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[var(--terracotta)]">CraftLink</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                  currentPage === item.id
                    ? 'text-[var(--terracotta)] bg-[var(--terracotta)]/10'
                    : 'text-gray-700 hover:text-[var(--terracotta)] hover:bg-[var(--terracotta)]/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            {/* Language Dropdown */}
            <div className="relative">
              <img
                src={languageLogo}
                alt="Language"
                className="ml-2 w-8 h-8 cursor-pointer"
                title="Select Language"
                onClick={() => setShowLangMenu((v) => !v)}
              />
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg z-50">
                  <button
                    className={`block w-full text-left px-4 py-2 hover:bg-[var(--terracotta)]/10 ${language === 'en' ? 'font-bold text-[var(--terracotta)]' : ''}`}
                    onClick={() => { setLanguage('en'); setShowLangMenu(false); }}
                  >English</button>
                  <button
                    className={`block w-full text-left px-4 py-2 hover:bg-[var(--terracotta)]/10 ${language === 'hi' ? 'font-bold text-[var(--terracotta)]' : ''}`}
                    onClick={() => { setLanguage('hi'); setShowLangMenu(false); }}
                  >हिन्दी</button>
                </div>
              )}
            </div>
            {/* Dark/Light Mode Toggle */}
            <button
              className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow cursor-pointer hover:bg-[var(--gold)]/10"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              onClick={() => {
                setDarkMode(!darkMode);
                document.documentElement.classList.toggle('dark', !darkMode);
              }}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 4.222l-.707.707M21 12h1M3 12H2m16.485 4.485l-.707-.707M4.222 19.778l-.707-.707" />
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                </svg>
              )}
            </button>
            {/* Notification Icon */}
            <button className="relative bg-white rounded-full shadow p-2 hover:bg-[var(--gold)]/10 ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[var(--terracotta)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              onClick={() => handleNavigate('upload')}
              className="bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90 text-white"
            >
              Showcase Your Craft
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`px-3 py-2 rounded-md text-left transition-colors duration-200 ${
                    currentPage === item.id
                      ? 'text-[var(--terracotta)] bg-[var(--terracotta)]/10'
                      : 'text-gray-700 hover:text-[var(--terracotta)] hover:bg-[var(--terracotta)]/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Button 
                onClick={() => handleNavigate('upload')}
                className="bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90 text-white mt-4"
              >
                Showcase Your Craft
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}