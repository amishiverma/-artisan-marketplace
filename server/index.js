import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Simple bot logic (replace with real AI later)
function getBotResponse(message, language = 'en') {
  const lower = message.toLowerCase();
  if (language === 'hi') {
    if (lower.includes('blue pottery') || lower.includes('नीला')) {
      return 'नीली पॉटरी जयपुर, राजस्थान की पारंपरिक कला है। इसकी नीली रंगत कोबाल्ट ऑक्साइड से आती है और इसमें फारसी शैली के सुंदर पैटर्न होते हैं।';
    } else if (lower.includes('banarasi') || lower.includes('सिल्क') || lower.includes('साड़ी')) {
      return 'बनारसी सिल्क साड़ियाँ वाराणसी में बुनी जाती हैं और अपने सोने-चांदी के ज़री काम के लिए प्रसिद्ध हैं।';
    } else if (lower.includes('kundan') || lower.includes('गहना') || lower.includes('ज्वेलरी')) {
      return 'कुंदन गहने भारतीय रत्नों की पारंपरिक शैली है, जो राजस्थान और गुजरात से उत्पन्न हुई है।';
    } else if (lower.includes('culture') || lower.includes('heritage') || lower.includes('संस्कृति') || lower.includes('विरासत')) {
      return 'भारतीय पारंपरिक शिल्प हमारी सांस्कृतिक विरासत के जीवंत प्रतीक हैं।';
    } else {
      return 'नमस्ते! मैं महाराजा हूँ, आपका CraftLink AI सहायक। मुझसे भारतीय शिल्प, कारीगरों या सांस्कृतिक विरासत के बारे में पूछें।';
    }
  } else {
    if (lower.includes('blue pottery')) {
      return 'Blue pottery is a traditional craft from Jaipur, Rajasthan. It gets its distinctive blue color from cobalt oxide and is known for its intricate Persian-influenced patterns.';
    } else if (lower.includes('banarasi')) {
      return 'Banarasi silk sarees are woven in Varanasi and are famous for their gold and silver brocade work.';
    } else if (lower.includes('kundan')) {
      return 'Kundan jewelry is a traditional form of Indian gemstone jewelry, originating in Rajasthan and Gujarat.';
    } else if (lower.includes('culture') || lower.includes('heritage')) {
      return 'Indian traditional crafts are living embodiments of our cultural heritage.';
    } else {
      return 'Namaste! I am Maharaji, your CraftLink AI assistant. Ask me about Indian crafts, artisans, or cultural heritage.';
    }
  }
}

app.post('/api/chat', (req, res) => {
  const { message, language } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }
  const response = getBotResponse(message, language);
  res.json({ response });
});

app.listen(PORT, () => {
  console.log(`Chatbot backend running on http://localhost:${PORT}`);
});
