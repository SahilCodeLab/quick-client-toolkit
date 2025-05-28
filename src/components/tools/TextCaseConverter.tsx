
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const TextCaseConverter = () => {
  const [text, setText] = useState('');

  const convertCase = (type: string) => {
    switch (type) {
      case 'upper':
        setText(text.toUpperCase());
        break;
      case 'lower':
        setText(text.toLowerCase());
        break;
      case 'title':
        setText(text.replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        ));
        break;
      case 'sentence':
        setText(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase());
        break;
      case 'camel':
        setText(text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
          index === 0 ? word.toLowerCase() : word.toUpperCase()
        ).replace(/\s+/g, ''));
        break;
      case 'pascal':
        setText(text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => 
          word.toUpperCase()
        ).replace(/\s+/g, ''));
        break;
      case 'snake':
        setText(text.toLowerCase().replace(/\s+/g, '_'));
        break;
      case 'kebab':
        setText(text.toLowerCase().replace(/\s+/g, '-'));
        break;
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    alert('Text copied to clipboard!');
  };

  const clearText = () => {
    setText('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Text Case Converter
      </h2>

      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Enter your text
            </label>
            <div className="flex gap-2">
              <Button onClick={copyText} disabled={!text} size="sm" variant="outline">
                Copy
              </Button>
              <Button onClick={clearText} disabled={!text} size="sm" variant="outline">
                Clear
              </Button>
            </div>
          </div>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            rows={6}
            className="resize-none"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button onClick={() => convertCase('upper')} disabled={!text} variant="outline">
            UPPERCASE
          </Button>
          <Button onClick={() => convertCase('lower')} disabled={!text} variant="outline">
            lowercase
          </Button>
          <Button onClick={() => convertCase('title')} disabled={!text} variant="outline">
            Title Case
          </Button>
          <Button onClick={() => convertCase('sentence')} disabled={!text} variant="outline">
            Sentence case
          </Button>
          <Button onClick={() => convertCase('camel')} disabled={!text} variant="outline">
            camelCase
          </Button>
          <Button onClick={() => convertCase('pascal')} disabled={!text} variant="outline">
            PascalCase
          </Button>
          <Button onClick={() => convertCase('snake')} disabled={!text} variant="outline">
            snake_case
          </Button>
          <Button onClick={() => convertCase('kebab')} disabled={!text} variant="outline">
            kebab-case
          </Button>
        </div>

        {text && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-600 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Character count: {text.length} | Word count: {text.trim() ? text.trim().split(/\s+/).length : 0}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextCaseConverter;
