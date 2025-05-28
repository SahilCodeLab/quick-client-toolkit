
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('15');
  const [numberOfPeople, setNumberOfPeople] = useState('1');

  const bill = parseFloat(billAmount) || 0;
  const tip = parseFloat(tipPercentage) || 0;
  const people = parseInt(numberOfPeople) || 1;

  const tipAmount = (bill * tip) / 100;
  const totalAmount = bill + tipAmount;
  const perPersonAmount = totalAmount / people;
  const tipPerPerson = tipAmount / people;

  const presetTips = [10, 15, 18, 20, 25];

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Tip Calculator
      </h2>

      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bill Amount ($)
            </label>
            <Input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              placeholder="Enter bill amount"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tip Percentage (%)
            </label>
            <Input
              type="number"
              value={tipPercentage}
              onChange={(e) => setTipPercentage(e.target.value)}
              placeholder="Enter tip percentage"
            />
            <div className="flex gap-2 mt-2">
              {presetTips.map(preset => (
                <Button
                  key={preset}
                  variant="outline"
                  size="sm"
                  onClick={() => setTipPercentage(preset.toString())}
                  className="text-xs"
                >
                  {preset}%
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of People
            </label>
            <Input
              type="number"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
              min="1"
              placeholder="Number of people"
            />
          </div>
        </div>

        {bill > 0 && (
          <div className="space-y-3">
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">Total per person</div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                  ${perPersonAmount.toFixed(2)}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-gray-100 dark:bg-gray-600 p-3 rounded text-center">
                <div className="text-xs text-gray-600 dark:text-gray-400">Tip Amount</div>
                <div className="font-semibold">${tipAmount.toFixed(2)}</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-600 p-3 rounded text-center">
                <div className="text-xs text-gray-600 dark:text-gray-400">Total Amount</div>
                <div className="font-semibold">${totalAmount.toFixed(2)}</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-600 p-3 rounded text-center">
                <div className="text-xs text-gray-600 dark:text-gray-400">Tip per Person</div>
                <div className="font-semibold">${tipPerPerson.toFixed(2)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TipCalculator;
