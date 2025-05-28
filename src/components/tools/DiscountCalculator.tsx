
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const DiscountCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  
  const price = parseFloat(originalPrice) || 0;
  const discount = parseFloat(discountPercentage) || 0;
  
  const discountAmount = (price * discount) / 100;
  const finalPrice = price - discountAmount;
  const savings = discountAmount;

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Discount Calculator
      </h2>

      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Original Price ($)
            </label>
            <Input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="Enter original price"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Discount Percentage (%)
            </label>
            <Input
              type="number"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
              placeholder="Enter discount percentage"
            />
          </div>
        </div>

        {price > 0 && discount > 0 && (
          <div className="space-y-4">
            <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">Final Price</div>
              <div className="text-3xl font-bold text-red-700 dark:text-red-300">
                ${finalPrice.toFixed(2)}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-100 dark:bg-gray-600 p-3 rounded text-center">
                <div className="text-xs text-gray-600 dark:text-gray-400">You Save</div>
                <div className="font-semibold text-green-600">${savings.toFixed(2)}</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-600 p-3 rounded text-center">
                <div className="text-xs text-gray-600 dark:text-gray-400">Discount Amount</div>
                <div className="font-semibold">${discountAmount.toFixed(2)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountCalculator;
