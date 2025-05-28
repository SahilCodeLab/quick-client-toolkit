
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState([12]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) return;

    let result = '';
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score < 3) return { text: 'Weak', color: 'text-red-500' };
    if (score < 5) return { text: 'Medium', color: 'text-yellow-500' };
    return { text: 'Strong', color: 'text-green-500' };
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Password Generator
      </h2>

      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
        {/* Password Display */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Generated Password
          </label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={password}
              readOnly
              placeholder="Click generate to create password"
              className="font-mono"
            />
            <Button
              onClick={copyToClipboard}
              disabled={!password}
              size="sm"
            >
              Copy
            </Button>
          </div>
          {password && (
            <div className="mt-2 text-sm">
              Strength: <span className={getPasswordStrength(password).color}>
                {getPasswordStrength(password).text}
              </span>
            </div>
          )}
        </div>

        {/* Length Slider */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Length: {length[0]}
          </label>
          <Slider
            value={length}
            onValueChange={setLength}
            max={50}
            min={4}
            step={1}
            className="w-full"
          />
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="uppercase"
              checked={includeUppercase}
              onCheckedChange={setIncludeUppercase}
            />
            <label htmlFor="uppercase" className="text-sm text-gray-700 dark:text-gray-300">
              Include Uppercase (A-Z)
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="lowercase"
              checked={includeLowercase}
              onCheckedChange={setIncludeLowercase}
            />
            <label htmlFor="lowercase" className="text-sm text-gray-700 dark:text-gray-300">
              Include Lowercase (a-z)
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="numbers"
              checked={includeNumbers}
              onCheckedChange={setIncludeNumbers}
            />
            <label htmlFor="numbers" className="text-sm text-gray-700 dark:text-gray-300">
              Include Numbers (0-9)
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="symbols"
              checked={includeSymbols}
              onCheckedChange={setIncludeSymbols}
            />
            <label htmlFor="symbols" className="text-sm text-gray-700 dark:text-gray-300">
              Include Symbols (!@#$%^&*)
            </label>
          </div>
        </div>

        <Button onClick={generatePassword} className="w-full">
          Generate Password
        </Button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
