
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FileSizeConverter = () => {
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('MB');
  const [toUnit, setToUnit] = useState('GB');

  const units = {
    'B': { name: 'Bytes', factor: 1 },
    'KB': { name: 'Kilobytes', factor: 1024 },
    'MB': { name: 'Megabytes', factor: 1024 * 1024 },
    'GB': { name: 'Gigabytes', factor: 1024 * 1024 * 1024 },
    'TB': { name: 'Terabytes', factor: 1024 * 1024 * 1024 * 1024 },
    'PB': { name: 'Petabytes', factor: 1024 * 1024 * 1024 * 1024 * 1024 }
  };

  const convert = () => {
    const inputValue = parseFloat(value) || 0;
    const fromFactor = units[fromUnit as keyof typeof units].factor;
    const toFactor = units[toUnit as keyof typeof units].factor;
    
    const bytes = inputValue * fromFactor;
    return bytes / toFactor;
  };

  const result = convert();

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        File Size Converter
      </h2>

      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Value
            </label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter file size"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                From
              </label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(units).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {key} - {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  {Object.entries(units).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {key} - {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {value} {fromUnit} equals
          </div>
          <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">
            {result.toLocaleString('en-US', { maximumFractionDigits: 10 })}
          </div>
          <div className="text-lg text-blue-600 dark:text-blue-400">
            {toUnit}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const temp = fromUnit;
              setFromUnit(toUnit);
              setToUnit(temp);
            }}
          >
            Swap Units
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setValue('1')}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileSizeConverter;
