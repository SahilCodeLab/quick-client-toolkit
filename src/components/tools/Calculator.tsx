
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [isScientific, setIsScientific] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const scientificOperation = (func: string) => {
    const value = parseFloat(display);
    let result = 0;

    switch (func) {
      case 'sin':
        result = Math.sin(value * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(value * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(value * Math.PI / 180);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'square':
        result = value * value;
        break;
      case 'factorial':
        result = factorial(value);
        break;
    }

    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const factorial = (n: number): number => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Calculator</h2>
        <Button
          variant="outline"
          onClick={() => setIsScientific(!isScientific)}
          className="text-sm"
        >
          {isScientific ? 'Basic' : 'Scientific'}
        </Button>
      </div>

      {/* Display */}
      <div className="bg-gray-900 text-white p-6 rounded-lg mb-4 text-right">
        <div className="text-3xl font-mono overflow-hidden">{display}</div>
      </div>

      {/* Scientific Functions */}
      {isScientific && (
        <div className="grid grid-cols-4 gap-2 mb-4">
          <Button variant="outline" onClick={() => scientificOperation('sin')}>sin</Button>
          <Button variant="outline" onClick={() => scientificOperation('cos')}>cos</Button>
          <Button variant="outline" onClick={() => scientificOperation('tan')}>tan</Button>
          <Button variant="outline" onClick={() => scientificOperation('log')}>log</Button>
          <Button variant="outline" onClick={() => scientificOperation('ln')}>ln</Button>
          <Button variant="outline" onClick={() => scientificOperation('sqrt')}>√</Button>
          <Button variant="outline" onClick={() => scientificOperation('square')}>x²</Button>
          <Button variant="outline" onClick={() => scientificOperation('factorial')}>x!</Button>
        </div>
      )}

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3">
        <Button variant="outline" onClick={clear} className="col-span-2 h-14">Clear</Button>
        <Button variant="outline" onClick={() => setDisplay(display.slice(0, -1))} className="h-14">⌫</Button>
        <Button variant="outline" onClick={() => inputOperation('÷')} className="h-14 bg-blue-500 text-white hover:bg-blue-600">÷</Button>

        <Button variant="outline" onClick={() => inputNumber('7')} className="h-14">7</Button>
        <Button variant="outline" onClick={() => inputNumber('8')} className="h-14">8</Button>
        <Button variant="outline" onClick={() => inputNumber('9')} className="h-14">9</Button>
        <Button variant="outline" onClick={() => inputOperation('×')} className="h-14 bg-blue-500 text-white hover:bg-blue-600">×</Button>

        <Button variant="outline" onClick={() => inputNumber('4')} className="h-14">4</Button>
        <Button variant="outline" onClick={() => inputNumber('5')} className="h-14">5</Button>
        <Button variant="outline" onClick={() => inputNumber('6')} className="h-14">6</Button>
        <Button variant="outline" onClick={() => inputOperation('-')} className="h-14 bg-blue-500 text-white hover:bg-blue-600">-</Button>

        <Button variant="outline" onClick={() => inputNumber('1')} className="h-14">1</Button>
        <Button variant="outline" onClick={() => inputNumber('2')} className="h-14">2</Button>
        <Button variant="outline" onClick={() => inputNumber('3')} className="h-14">3</Button>
        <Button variant="outline" onClick={() => inputOperation('+')} className="h-14 bg-blue-500 text-white hover:bg-blue-600">+</Button>

        <Button variant="outline" onClick={() => inputNumber('0')} className="h-14 col-span-2">0</Button>
        <Button variant="outline" onClick={() => inputNumber('.')} className="h-14">.</Button>
        <Button onClick={performCalculation} className="h-14 bg-green-500 text-white hover:bg-green-600">=</Button>
      </div>
    </div>
  );
};

export default Calculator;
