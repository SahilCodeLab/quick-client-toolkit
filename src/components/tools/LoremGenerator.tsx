
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const LoremGenerator = () => {
  const [count, setCount] = useState('3');
  const [type, setType] = useState('paragraphs');
  const [generatedText, setGeneratedText] = useState('');

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  const generateWord = () => {
    return loremWords[Math.floor(Math.random() * loremWords.length)];
  };

  const generateSentence = () => {
    const wordCount = Math.floor(Math.random() * 10) + 5; // 5-14 words
    const words = Array.from({ length: wordCount }, generateWord);
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
  };

  const generateParagraph = () => {
    const sentenceCount = Math.floor(Math.random() * 5) + 3; // 3-7 sentences
    return Array.from({ length: sentenceCount }, generateSentence).join(' ');
  };

  const generateText = () => {
    const amount = parseInt(count) || 1;
    let result = '';

    switch (type) {
      case 'words':
        result = Array.from({ length: amount }, generateWord).join(' ');
        break;
      case 'sentences':
        result = Array.from({ length: amount }, generateSentence).join(' ');
        break;
      case 'paragraphs':
        result = Array.from({ length: amount }, generateParagraph).join('\n\n');
        break;
    }

    setGeneratedText(result);
  };

  const copyText = () => {
    navigator.clipboard.writeText(generatedText);
    alert('Text copied to clipboard!');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Lorem Ipsum Generator
      </h2>

      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount
            </label>
            <Input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              min="1"
              max="100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type
            </label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="words">Words</SelectItem>
                <SelectItem value="sentences">Sentences</SelectItem>
                <SelectItem value="paragraphs">Paragraphs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={generateText} className="w-full mb-6">
          Generate Lorem Ipsum
        </Button>

        {generatedText && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Generated Text
              </label>
              <Button onClick={copyText} size="sm" variant="outline">
                Copy
              </Button>
            </div>
            <Textarea
              value={generatedText}
              readOnly
              rows={10}
              className="resize-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoremGenerator;
