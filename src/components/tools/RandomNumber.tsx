
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const RandomNumber = () => {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState('1');
  const [results, setResults] = useState<number[]>([]);

  const generateNumbers = () => {
    const minNum = parseInt(min) || 0;
    const maxNum = parseInt(max) || 100;
    const countNum = parseInt(count) || 1;

    if (minNum >= maxNum) {
      alert('Minimum must be less than maximum!');
      return;
    }

    const numbers = Array.from({ length: Math.min(countNum, 100) }, () => 
      Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
    );

    setResults(numbers);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Random Number Generator
      </h2>

      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Minimum
              </label>
              <Input
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Maximum
              </label>
              <Input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Count (max 100)
            </label>
            <Input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              min="1"
              max="100"
            />
          </div>
        </div>

        <Button onClick={generateNumbers} className="w-full mb-6">
          Generate Numbers
        </Button>

        {results.length > 0 && (
          <div className="bg-gray-100 dark:bg-gray-600 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Generated Numbers:
            </h3>
            <div className="grid grid-cols-5 gap-2 max-h-40 overflow-y-auto">
              {results.map((number, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 p-2 rounded text-center font-mono">
                  {number}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomNumber;
