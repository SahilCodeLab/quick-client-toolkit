
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const TypingTest = () => {
  const [text] = useState("The quick brown fox jumps over the lazy dog. This is a sample text for typing speed test. Keep typing to measure your words per minute and accuracy.");
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (!startTime && value.length === 1) {
      setStartTime(Date.now());
      setIsActive(true);
    }

    setUserInput(value);

    if (value.length === text.length) {
      setIsActive(false);
      calculateResults(value);
    }
  };

  const calculateResults = (input: string) => {
    if (!startTime) return;

    const endTime = Date.now();
    const timeInMinutes = (endTime - startTime) / 60000;
    const wordsTyped = input.split(' ').length;
    const calculatedWpm = Math.round(wordsTyped / timeInMinutes);

    let correctChars = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === text[i]) correctChars++;
    }
    const calculatedAccuracy = Math.round((correctChars / input.length) * 100);

    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);
  };

  const reset = () => {
    setUserInput('');
    setStartTime(null);
    setIsActive(false);
    setWpm(0);
    setAccuracy(100);
    inputRef.current?.focus();
  };

  const renderText = () => {
    return text.split('').map((char, index) => {
      let className = 'p-0.5';
      
      if (index < userInput.length) {
        className += userInput[index] === char ? ' bg-green-200 dark:bg-green-800' : ' bg-red-200 dark:bg-red-800';
      } else if (index === userInput.length) {
        className += ' bg-blue-200 dark:bg-blue-800';
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Typing Speed Test
      </h2>

      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {wpm}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">WPM</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {accuracy}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {Math.round((userInput.length / text.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Progress</div>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-600 p-4 rounded-lg mb-4 font-mono text-lg leading-relaxed">
          {renderText()}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Start typing here..."
          disabled={userInput.length >= text.length}
        />

        <div className="flex justify-center mt-6">
          <Button onClick={reset}>
            Reset Test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TypingTest;
