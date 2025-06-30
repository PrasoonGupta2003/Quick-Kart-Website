import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AILogo from '../assets/ai.png';

const pages = {
  home: ['/', 'home', 'go home', 'main page'],
  cart: ['/cart', 'cart', 'open cart', 'my cart'],
  orders: ['/orders', 'orders', 'my orders', 'order history'],
  'place order': ['/placeorder', 'place order', 'checkout', 'place my order'],
  collection: ['/collection', 'collection', 'products', 'shop'],
};

function AIAssistant() {
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Speech Recognition not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
      speak('Listening...');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log('🗣️ Heard:', transcript);
      let matched = false;

      for (const [page, phrases] of Object.entries(pages)) {
        if (phrases.some(p => transcript.includes(p))) {
          speak(`Showing ${page} page`);
          navigate(pages[page][0]); // Use the first path for navigation
          matched = true;
          break;
        }
      }

      if (!matched) {
        speak("Sorry, I didn't understand that.");
      }

      // Always stop listening after processing a result
      stopRecognition(recognition);
    };

    recognition.onerror = () => {
      speak('Something went wrong. Please try again.');
      stopRecognition(recognition);
    };

    recognition.onend = () => {
      // Ensure state is clean
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, [navigate]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.cancel(); // Cancel ongoing speech
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (listening) {
      stopRecognition(recognitionRef.current);
      speak('Stopped listening.');
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    }
  };

  const stopRecognition = (recognitionInstance) => {
    if (recognitionInstance) {
      try {
        recognitionInstance.stop();
      } catch (e) {
        console.warn('Stop error:', e);
      }
    }
    setListening(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleListening}
        className={`w-16 h-16 rounded-full bg-white shadow-lg hover:scale-105 transition-all border-2 ${
          listening ? 'border-green-500 animate-pulse' : 'border-gray-300'
        } flex items-center justify-center`}
        title={listening ? 'Listening...' : 'Click to speak'}
      >
        <img src={AILogo} alt="AI Assistant" className="w-10 h-10" />
      </button>
      {listening && (
        <div className="mt-2 text-sm text-green-600 text-center font-medium animate-pulse">
          Listening...
        </div>
      )}
    </div>
  );
}

export default AIAssistant;
