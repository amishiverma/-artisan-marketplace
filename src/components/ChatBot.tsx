import maharajaAvatar from 'figma:asset/a74347f53a4cb875c110c3430ff80f33dfa87e13.png';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { MessageCircle, X, Send, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import maharajiAvatar from '../assets/maharaji-avatar.png';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

  interface ChatBotProps {
    language: 'en' | 'hi';
  }

  export default function ChatBot({ language }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: language === 'hi'
        ? 'नमस्ते! मैं महाराजा हूँ, आपका CraftLink AI सहायक। मैं आपको पारंपरिक भारतीय शिल्प, कारीगरों या सांस्कृतिक विरासत के बारे में जानकारी दे सकता हूँ। कैसे मदद कर सकता हूँ?'
        : 'Namaste! I\'m Maharaja, your CraftLink AI assistant. I can help you learn about traditional Indian crafts, find specific artisans, or answer questions about cultural heritage. How may I serve you today? 🙏',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = language === 'hi'
    ? [
        'नीली पॉटरी के बारे में बताएं',
        'बनारसी सिल्क कारीगर खोजें',
        'कुंदन गहनों के बारे में क्या है?',
        'शिल्पों का सांस्कृतिक महत्व'
      ]
    : [
        'Tell me about blue pottery',
        'Find Banarasi silk artisans',
        'What is Kundan jewelry?',
        'Cultural significance of crafts'
      ];
  const botResponses = {
    'blue pottery': 'Blue pottery is a traditional craft from Jaipur, Rajasthan. It gets its distinctive blue color from cobalt oxide and is known for its intricate Persian-influenced patterns. The technique was brought to India by Mughal artisans and has been preserved by master potters for centuries. Would you like to see some blue pottery pieces in our marketplace?',
    'banarasi silk': 'Banarasi silk sarees are woven in Varanasi and are famous for their gold and silver brocade work. These luxurious fabrics often feature intricate patterns inspired by Mughal art, including floral and foliate motifs, kalga and bel (paisley). The weaving process can take weeks or even months for a single saree. Our platform features several master weavers from Varanasi.',
    'kundan jewelry': 'Kundan jewelry is a traditional form of Indian gemstone jewelry. The word "Kundan" means pure gold, and this technique involves setting precious stones in gold foil. It originated in the royal courts of Rajasthan and Gujarat and was later adopted by the Mughal courts. The jewelry often features uncut diamonds (polki) and is perfect for weddings and special occasions.',
    'cultural significance': 'Indian traditional crafts are not just products - they are living embodiments of our cultural heritage. Each craft tells stories of ancient traditions, regional histories, and skilled artisans who have preserved these techniques for generations. They represent sustainable practices, community knowledge, and the spiritual connection between creator and creation.',
    'default': 'That\'s a great question! Our platform connects you with authentic Indian artisans and their traditional crafts. Each piece comes with its cultural story and heritage. You can explore our marketplace to discover pottery, textiles, jewelry, and more. Is there a specific craft or region you\'re interested in learning about?'
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('blue pottery') || lowerMessage.includes('pottery')) {
      return botResponses['blue pottery'];
    } else if (lowerMessage.includes('banarasi') || lowerMessage.includes('silk') || lowerMessage.includes('saree')) {
      return botResponses['banarasi silk'];
    } else if (lowerMessage.includes('kundan') || lowerMessage.includes('jewelry') || lowerMessage.includes('jewellery')) {
      return botResponses['kundan jewelry'];
    } else if (lowerMessage.includes('culture') || lowerMessage.includes('significance') || lowerMessage.includes('heritage')) {
      return botResponses['cultural significance'];
    } else {
      return botResponses['default'];
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Send message to backend API with language
    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputValue, language })
      });
      const data = await res.json();
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: data.response || (language === 'hi' ? 'माफ़ कीजिए, मैं समझ नहीं पाया। कृपया फिर से प्रयास करें।' : 'Sorry, I could not understand. Please try again.'),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 2).toString(),
        type: 'bot',
        content: language === 'hi' ? 'माफ़ कीजिए, सर्वर से कनेक्ट करने में समस्या है।' : 'Sorry, there was a problem connecting to the server.',
        timestamp: new Date()
      }]);
    }
    setIsTyping(false);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="relative">
          <Button
            onClick={() => setIsOpen(true)}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--terracotta)] to-[var(--gold)] hover:shadow-2xl transition-all duration-300 shadow-xl p-2 overflow-hidden"
          >
            <img
              src={maharajaAvatar}
              alt="Maharaja AI Assistant"
              className="w-full h-full object-cover rounded-xl"
            />
          </Button>
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--terracotta)]/40 to-[var(--gold)]/40 -z-10"
          />
          {/* Floating notification dot */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-28 right-6 z-50 w-96 h-[500px] max-w-[calc(100vw-2rem)]"
          >
            <Card className="h-full flex flex-col shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[var(--terracotta)] to-[var(--gold)] text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/20 p-1">
                      <img
                        src={maharajaAvatar}
                        alt="Maharaja AI"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Maharaja AI</CardTitle>
                      <div className="flex items-center space-x-1 text-white/80 text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>At your service</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: '320px', overflowY: 'auto' }}>
                  {messages.map(message => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[80%] ${
                        message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${
                          message.type === 'user' 
                            ? 'bg-[var(--terracotta)]' 
                            : 'bg-gradient-to-br from-[var(--terracotta)]/20 to-[var(--gold)]/20 p-1'
                        }`}>
                          {message.type === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <img
                              src={maharajaAvatar}
                              alt="Maharaja"
                              className="w-full h-full object-cover rounded-full"
                            />
                          )}
                        </div>
                        <div className={`rounded-xl px-3 py-2 ${
                          message.type === 'user'
                            ? 'bg-[var(--terracotta)] text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--terracotta)]/20 to-[var(--gold)]/20 flex items-center justify-center p-1 overflow-hidden">
                          <img
                            src={maharajaAvatar}
                            alt="Maharaja"
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <div className="bg-gray-100 rounded-xl px-3 py-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Quick Questions */}
                {messages.length === 1 && (
                  <div className="px-4 pb-2">
                    <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                    <div className="flex flex-wrap gap-1">
                      {quickQuestions.map(question => (
                        <Badge
                          key={question}
                          variant="outline"
                          className="cursor-pointer hover:bg-[var(--terracotta)]/10 text-xs"
                          onClick={() => handleQuickQuestion(question)}
                        >
                          {question}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask about crafts, artisans, or heritage..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 text-sm"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      size="sm"
                      className="bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}