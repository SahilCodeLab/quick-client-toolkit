
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const QuoteGenerator = () => {
  const [currentQuote, setCurrentQuote] = useState<{quote: string, author: string} | null>(null);
  const [category, setCategory] = useState('motivation');

  const quotes = {
    motivation: [
      { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { quote: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
      { quote: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
      { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
      { quote: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
      { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
      { quote: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
      { quote: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" }
    ],
    success: [
      { quote: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" },
      { quote: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
      { quote: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
      { quote: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
      { quote: "If you really look closely, most overnight successes took a long time.", author: "Steve Jobs" },
      { quote: "Success is not about the destination, it's about the journey.", author: "Zig Ziglar" }
    ],
    wisdom: [
      { quote: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
      { quote: "Yesterday is history, tomorrow is a mystery, today is a gift.", author: "Eleanor Roosevelt" },
      { quote: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
      { quote: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein" },
      { quote: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero" },
      { quote: "You only live once, but if you do it right, once is enough.", author: "Mae West" }
    ],
    life: [
      { quote: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
      { quote: "Life is really simple, but we insist on making it complicated.", author: "Confucius" },
      { quote: "The unexamined life is not worth living.", author: "Socrates" },
      { quote: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
      { quote: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll" },
      { quote: "In the end, we will remember not the words of our enemies, but the silence of our friends.", author: "Martin Luther King Jr." }
    ]
  };

  const generateQuote = () => {
    const categoryQuotes = quotes[category as keyof typeof quotes];
    const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
    setCurrentQuote(categoryQuotes[randomIndex]);
  };

  const shareQuote = () => {
    if (currentQuote) {
      const text = `"${currentQuote.quote}" - ${currentQuote.author}`;
      if (navigator.share) {
        navigator.share({
          title: 'Inspirational Quote',
          text: text
        });
      } else {
        navigator.clipboard.writeText(text);
        alert('Quote copied to clipboard!');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Quote Generator
      </h2>

      <div className="bg-white dark:bg-gray-700 p-8 rounded-xl border border-gray-200 dark:border-gray-600">
        {/* Category Selection */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Choose Category
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.keys(quotes).map(cat => (
              <Button
                key={cat}
                variant={category === cat ? 'default' : 'outline'}
                onClick={() => setCategory(cat)}
                className="text-sm capitalize"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Quote Display */}
        {currentQuote ? (
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-lg mb-6 text-center">
            <blockquote className="text-xl md:text-2xl font-serif italic text-gray-800 dark:text-white mb-4 leading-relaxed">
              "{currentQuote.quote}"
            </blockquote>
            <cite className="text-lg font-medium text-gray-600 dark:text-gray-300">
              — {currentQuote.author}
            </cite>
          </div>
        ) : (
          <div className="bg-gray-100 dark:bg-gray-600 p-8 rounded-lg mb-6 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Click "Generate Quote" to get an inspirational quote!
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button onClick={generateQuote} className="px-8">
            Generate Quote
          </Button>
          {currentQuote && (
            <Button onClick={shareQuote} variant="outline" className="px-8">
              Share Quote
            </Button>
          )}
        </div>

        {/* Quote Count Info */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          {quotes[category as keyof typeof quotes].length} quotes available in {category}
        </div>
      </div>
    </div>
  );
};

export default QuoteGenerator;
