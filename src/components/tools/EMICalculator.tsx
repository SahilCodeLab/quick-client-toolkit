
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const EMICalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emi, setEMI] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  const calculateEMI = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(tenure) * 12;

    if (p <= 0 || r <= 0 || n <= 0) return;

    const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmountValue = emiValue * n;
    const totalInterestValue = totalAmountValue - p;

    setEMI(emiValue);
    setTotalAmount(totalAmountValue);
    setTotalInterest(totalInterestValue);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        EMI Calculator
      </h2>

      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Loan Amount ($)
            </label>
            <Input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Enter loan amount"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Interest Rate (% per year)
            </label>
            <Input
              type="number"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Enter interest rate"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Loan Tenure (years)
            </label>
            <Input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              placeholder="Enter tenure in years"
            />
          </div>
        </div>

        <Button onClick={calculateEMI} className="w-full mb-6">
          Calculate EMI
        </Button>

        {emi && (
          <div className="space-y-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">Monthly EMI</div>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                ${emi.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-600 p-3 rounded text-center">
                <div className="text-xs text-gray-600 dark:text-gray-400">Total Amount</div>
                <div className="font-semibold text-gray-800 dark:text-white">
                  ${totalAmount?.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-600 p-3 rounded text-center">
                <div className="text-xs text-gray-600 dark:text-gray-400">Total Interest</div>
                <div className="font-semibold text-gray-800 dark:text-white">
                  ${totalInterest?.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EMICalculator;
