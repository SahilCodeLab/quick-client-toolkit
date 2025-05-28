
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('metric');
  const [bmi, setBMI] = useState<number | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    
    if (w <= 0 || h <= 0) return;
    
    let bmiValue;
    if (unit === 'metric') {
      bmiValue = w / ((h / 100) * (h / 100));
    } else {
      bmiValue = (w / (h * h)) * 703;
    }
    
    setBMI(bmiValue);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal weight', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        BMI Calculator
      </h2>

      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
        <div className="mb-4">
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="metric">Metric (kg, cm)</SelectItem>
              <SelectItem value="imperial">Imperial (lbs, inches)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Weight ({unit === 'metric' ? 'kg' : 'lbs'})
            </label>
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={`Enter weight in ${unit === 'metric' ? 'kg' : 'lbs'}`}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Height ({unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={`Enter height in ${unit === 'metric' ? 'cm' : 'inches'}`}
            />
          </div>
        </div>

        <Button onClick={calculateBMI} className="w-full mb-6">
          Calculate BMI
        </Button>

        {bmi && (
          <div className="text-center">
            <div className="bg-gray-100 dark:bg-gray-600 p-6 rounded-lg">
              <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {bmi.toFixed(1)}
              </div>
              <div className={`text-lg font-semibold ${getBMICategory(bmi).color}`}>
                {getBMICategory(bmi).category}
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="grid grid-cols-2 gap-2 text-left">
                <div>Underweight: &lt; 18.5</div>
                <div>Normal: 18.5 - 24.9</div>
                <div>Overweight: 25 - 29.9</div>
                <div>Obese: ≥ 30</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;
