
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const conversions = {
  length: {
    name: 'Length',
    units: {
      meter: { name: 'Meter', factor: 1 },
      kilometer: { name: 'Kilometer', factor: 1000 },
      centimeter: { name: 'Centimeter', factor: 0.01 },
      millimeter: { name: 'Millimeter', factor: 0.001 },
      inch: { name: 'Inch', factor: 0.0254 },
      foot: { name: 'Foot', factor: 0.3048 },
      yard: { name: 'Yard', factor: 0.9144 },
      mile: { name: 'Mile', factor: 1609.34 }
    }
  },
  weight: {
    name: 'Weight',
    units: {
      kilogram: { name: 'Kilogram', factor: 1 },
      gram: { name: 'Gram', factor: 0.001 },
      pound: { name: 'Pound', factor: 0.453592 },
      ounce: { name: 'Ounce', factor: 0.0283495 },
      ton: { name: 'Ton', factor: 1000 },
      stone: { name: 'Stone', factor: 6.35029 }
    }
  },
  temperature: {
    name: 'Temperature',
    units: {
      celsius: { name: 'Celsius', factor: 1 },
      fahrenheit: { name: 'Fahrenheit', factor: 1 },
      kelvin: { name: 'Kelvin', factor: 1 }
    }
  },
  area: {
    name: 'Area',
    units: {
      'square-meter': { name: 'Square Meter', factor: 1 },
      'square-kilometer': { name: 'Square Kilometer', factor: 1000000 },
      'square-foot': { name: 'Square Foot', factor: 0.092903 },
      acre: { name: 'Acre', factor: 4046.86 },
      hectare: { name: 'Hectare', factor: 10000 }
    }
  }
};

type ConversionCategory = keyof typeof conversions;

const UnitConverter = () => {
  const [category, setCategory] = useState<ConversionCategory>('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [inputValue, setInputValue] = useState('1');
  const [result, setResult] = useState(0);

  const convert = () => {
    const value = parseFloat(inputValue) || 0;
    
    if (category === 'temperature') {
      setResult(convertTemperature(value, fromUnit, toUnit));
    } else {
      const categoryData = conversions[category];
      const fromFactor = (categoryData.units as any)[fromUnit]?.factor || 1;
      const toFactor = (categoryData.units as any)[toUnit]?.factor || 1;
      
      const baseValue = value * fromFactor;
      const convertedValue = baseValue / toFactor;
      setResult(convertedValue);
    }
  };

  const convertTemperature = (value: number, from: string, to: string): number => {
    let celsius = value;
    
    // Convert to Celsius first
    if (from === 'fahrenheit') {
      celsius = (value - 32) * 5/9;
    } else if (from === 'kelvin') {
      celsius = value - 273.15;
    }
    
    // Convert from Celsius to target
    if (to === 'fahrenheit') {
      return celsius * 9/5 + 32;
    } else if (to === 'kelvin') {
      return celsius + 273.15;
    }
    
    return celsius;
  };

  const handleCategoryChange = (newCategory: string) => {
    const typedCategory = newCategory as ConversionCategory;
    setCategory(typedCategory);
    const units = Object.keys(conversions[typedCategory].units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
  };

  React.useEffect(() => {
    convert();
  }, [inputValue, fromUnit, toUnit, category]);

  const currentCategory = conversions[category];
  const unitOptions = Object.entries(currentCategory.units);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Unit Converter
      </h2>

      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
        {/* Category Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(conversions).map(([key, value]) => (
              <Button
                key={key}
                variant={category === key ? 'default' : 'outline'}
                onClick={() => handleCategoryChange(key)}
                className="text-sm"
              >
                {value.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Value Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Value
          </label>
          <Input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
            className="text-lg"
          />
        </div>

        {/* Unit Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              From
            </label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {unitOptions.map(([key, unit]) => (
                  <SelectItem key={key} value={key}>
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end justify-center">
            <Button 
              variant="outline" 
              onClick={() => {
                const temp = fromUnit;
                setFromUnit(toUnit);
                setToUnit(temp);
              }}
              className="mb-2"
            >
              ⇄
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              To
            </label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {unitOptions.map(([key, unit]) => (
                  <SelectItem key={key} value={key}>
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Result */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-lg text-center">
          <div className="text-sm opacity-90 mb-2">
            {inputValue} {(currentCategory.units as any)[fromUnit]?.name} =
          </div>
          <div className="text-3xl font-bold">
            {result.toLocaleString('en-US', { 
              minimumFractionDigits: 0, 
              maximumFractionDigits: 6 
            })}
          </div>
          <div className="text-lg opacity-90">
            {(currentCategory.units as any)[toUnit]?.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
