
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

const Flashcards = () => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [newCard, setNewCard] = useState({ front: '', back: '' });
  const [isStudying, setIsStudying] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('flashcards');
    if (saved) {
      setCards(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(cards));
  }, [cards]);

  const addCard = () => {
    if (!newCard.front.trim() || !newCard.back.trim()) return;

    const card: Flashcard = {
      id: Date.now().toString(),
      front: newCard.front.trim(),
      back: newCard.back.trim()
    };

    setCards([...cards, card]);
    setNewCard({ front: '', back: '' });
  };

  const deleteCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
    if (currentIndex >= cards.length - 1) {
      setCurrentIndex(Math.max(0, cards.length - 2));
    }
  };

  const nextCard = () => {
    setCurrentIndex((currentIndex + 1) % cards.length);
    setShowBack(false);
  };

  const prevCard = () => {
    setCurrentIndex(currentIndex === 0 ? cards.length - 1 : currentIndex - 1);
    setShowBack(false);
  };

  const flipCard = () => {
    setShowBack(!showBack);
  };

  const startStudying = () => {
    if (cards.length > 0) {
      setIsStudying(true);
      setCurrentIndex(0);
      setShowBack(false);
    }
  };

  const currentCard = cards[currentIndex];

  if (isStudying && cards.length > 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Flashcards Study Mode
          </h2>
          <Button onClick={() => setIsStudying(false)} variant="outline">
            Exit Study Mode
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-700 p-8 rounded-xl border border-gray-200 dark:border-gray-600">
          <div className="text-center mb-6">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Card {currentIndex + 1} of {cards.length}
            </div>
          </div>

          <Card className="min-h-64 cursor-pointer" onClick={flipCard}>
            <CardContent className="flex items-center justify-center h-64 p-8">
              <div className="text-center">
                <div className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                  {showBack ? currentCard.back : currentCard.front}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {showBack ? 'Back' : 'Front'} - Click to flip
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center mt-6">
            <Button onClick={prevCard} disabled={cards.length <= 1}>
              Previous
            </Button>
            <Button onClick={flipCard} variant="outline">
              Flip Card
            </Button>
            <Button onClick={nextCard} disabled={cards.length <= 1}>
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Flashcards
      </h2>

      {/* Add Card Form */}
      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Add New Flashcard
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Front (Question/Term)
            </label>
            <Input
              value={newCard.front}
              onChange={(e) => setNewCard({ ...newCard, front: e.target.value })}
              placeholder="Enter the question or term"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Back (Answer/Definition)
            </label>
            <Textarea
              value={newCard.back}
              onChange={(e) => setNewCard({ ...newCard, back: e.target.value })}
              placeholder="Enter the answer or definition"
              rows={3}
            />
          </div>
          
          <Button 
            onClick={addCard} 
            disabled={!newCard.front.trim() || !newCard.back.trim()}
            className="w-full"
          >
            Add Flashcard
          </Button>
        </div>
      </div>

      {/* Card List and Study Button */}
      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Your Flashcards ({cards.length})
          </h3>
          {cards.length > 0 && (
            <Button onClick={startStudying}>
              Start Studying
            </Button>
          )}
        </div>

        {cards.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No flashcards yet. Add your first card above!
          </div>
        ) : (
          <div className="space-y-3">
            {cards.map((card, index) => (
              <div key={card.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 dark:text-white mb-1">
                      {card.front}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {card.back}
                    </div>
                  </div>
                  <Button
                    onClick={() => deleteCard(card.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 ml-4"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcards;
