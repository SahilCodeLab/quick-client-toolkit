
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Static exchange rates (in a real app, you'd fetch from an API)
const exchangeRates: { [key: string]: number } = {
  'USD': 1.00,
  'EUR': 0.85,
  'GBP': 0.73,
  'JPY': 110.12,
  'AUD': 1.35,
  'CAD': 1.25,
  'CHF': 0.92,
  'CNY': 6.45,
  'INR': 74.56,
  'BRL': 5.20,
  'RUB': 75.50,
  'KRW': 1180.00,
  'SGD': 1.35,
  'HKD': 7.80,
  'SEK': 8.65,
  'NOK': 8.85
};

const currencies = Object.keys(exchangeRates);

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(0);

  const convert = () => {
    const inputAmount = parseFloat(amount) || 0;
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    
    // Convert to USD first, then to target currency
    const usdAmount = inputAmount / fromRate;
    const convertedAmount = usdAmount * toRate;
    
    setResult(convertedAmount);
  };

  useEffect(() => {
    convert();
  }, [amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const popularConversions = [
    { from: 'USD', to: 'EUR' },
    { from: 'USD', to: 'GBP' },
    { from: 'USD', to: 'JPY' },
    { from: 'EUR', to: 'USD' },
    { from: 'GBP', to: 'USD' },
    { from: 'USD', to: 'INR' }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Currency Converter
      </h2>

      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600 mb-6">
        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Amount
          </label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="text-lg"
          />
        </div>

        {/* Currency Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              From
            </label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map(currency => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end justify-center">
            <Button variant="outline" onClick={swapCurrencies} className="mb-2">
              ⇄
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              To
            </label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map(currency => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Result */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg text-center">
          <div className="text-sm opacity-90 mb-2">
            {amount} {fromCurrency} =
          </div>
          <div className="text-3xl font-bold">
            {result.toLocaleString('en-US', { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })} {toCurrency}
          </div>
          <div className="text-sm opacity-75 mt-2">
            1 {fromCurrency} = {(exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(4)} {toCurrency}
          </div>
        </div>
      </div>

      {/* Popular Conversions */}
      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Popular Conversions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {popularConversions.map(({ from, to }) => (
            <Button
              key={`${from}-${to}`}
              variant="outline"
              size="sm"
              onClick={() => {
                setFromCurrency(from);
                setToCurrency(to);
              }}
              className="text-xs"
            >
              {from} → {to}
            </Button>
          ))}
        </div>
      </div>

      {/* Exchange Rate Table */}
      <div className="mt-6 bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Exchange Rates (Base: USD)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          {currencies.slice(0, 8).map(currency => (
            <div key={currency} className="flex justify-between p-2 bg-gray-50 dark:bg-gray-600 rounded">
              <span className="font-medium text-gray-700 dark:text-gray-300">{currency}</span>
              <span className="text-gray-900 dark:text-white">{exchangeRates[currency].toFixed(4)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
