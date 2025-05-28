
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const LoremGenerator = () => {
  const [count, setCount] = useState('3');
  const [type, setType] = useState('paragraphs');
  const [generatedText, setGeneratedText] = useState('');
  const [startWithLorem, setStartWithLorem] = useState(true);

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

  const generateWords = (wordCount: number) => {
    const words = [];
    
    if (startWithLorem && wordCount > 0) {
      words.push('Lorem');
      if (wordCount > 1) words.push('ipsum');
      if (wordCount > 2) words.push('dolor');
      if (wordCount > 3) words.push('sit');
      if (wordCount > 4) words.push('amet');
    }

    while (words.length < wordCount) {
      const randomWord = loremWords[Math.floor(Math.random() * loremWords.length)];
      words.push(randomWord);
    }

    return words.join(' ');
  };

  const generateSentence = () => {
    const wordCount = Math.floor(Math.random() * 10) + 5; // 5-14 words
    const words = generateWords(wordCount);
    return words.charAt(0).toUpperCase() + words.slice(1) + '.';
  };

  const generateParagraph = () => {
    const sentenceCount = Math.floor(Math.random() * 4) + 3; // 3-6 sentences
    const sentences = [];
    
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence());
    }
    
    return sentences.join(' ');
  };

  const generate = () => {
    const num = parseInt(count) || 1;
    let result = '';

    switch (type) {
      case 'words':
        result = generateWords(num);
        break;
      case 'sentences':
        const sentences = [];
        for (let i = 0; i < num; i++) {
          sentences.push(generateSentence());
        }
        result = sentences.join(' ');
        break;
      case 'paragraphs':
        const paragraphs = [];
        for (let i = 0; i < num; i++) {
          paragraphs.push(generateParagraph());
        }
        result = paragraphs.join('\n\n');
        break;
    }

    setGeneratedText(result);
  };

  const copyText = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);
      alert('Text copied to clipboard!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Lorem Ipsum Generator
      </h2>

      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Count
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

          <div className="flex items-end">
            <Button onClick={generate} className="w-full">
              Generate
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Start with "Lorem ipsum dolor sit amet"
            </span>
          </label>
        </div>

        {generatedText && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Generated Text
              </h3>
              <Button onClick={copyText} variant="outline" size="sm">
                Copy to Clipboard
              </Button>
            </div>
            
            <Textarea
              value={generatedText}
              readOnly
              rows={10}
              className="font-serif leading-relaxed"
            />
            
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Words: {generatedText.split(/\s+/).length} | 
              Characters: {generatedText.length} | 
              Characters (no spaces): {generatedText.replace(/\s/g, '').length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoremGenerator;
