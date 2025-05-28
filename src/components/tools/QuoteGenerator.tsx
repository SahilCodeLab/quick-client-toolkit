
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const QuoteGenerator = () => {
  const [currentQuote, setCurrentQuote] = useState({ text: '', author: '' });

  const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
    { text: "You learn more from failure than from success.", author: "Unknown" },
    { text: "If you are working on something that you really care about, you don't have to be pushed.", author: "Steve Jobs" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" }
  ];

  const generateQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  const shareQuote = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Motivational Quote',
        text: `"${currentQuote.text}" - ${currentQuote.author}`
      });
    } else {
      navigator.clipboard.writeText(`"${currentQuote.text}" - ${currentQuote.author}`);
      alert('Quote copied to clipboard!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Motivational Quote Generator
      </h2>

      <div className="bg-white dark:bg-gray-700 p-8 rounded-xl border border-gray-200 dark:border-gray-600">
        {currentQuote.text ? (
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-xl mb-6">
              <blockquote className="text-xl md:text-2xl font-medium mb-4">
                "{currentQuote.text}"
              </blockquote>
              <cite className="text-lg opacity-90">
                — {currentQuote.author}
              </cite>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button onClick={generateQuote}>
                Get New Quote
              </Button>
              <Button onClick={shareQuote} variant="outline">
                Share Quote
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-gray-500 dark:text-gray-400 mb-8">
              Click the button below to get your first motivational quote!
            </div>
            <Button onClick={generateQuote} size="lg">
              Generate Quote
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteGenerator;
