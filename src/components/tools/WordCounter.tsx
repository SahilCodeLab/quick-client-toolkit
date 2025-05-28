
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

const WordCounter = () => {
  const [text, setText] = useState('');

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).filter(word => word.length > 0).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0,
    paragraphs: text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200) // 200 words per minute
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Word & Character Counter
      </h2>

      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter your text
          </label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here to get detailed statistics..."
            rows={8}
            className="resize-none"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              {stats.characters.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Characters</div>
          </div>

          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
              {stats.charactersNoSpaces.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Characters (no spaces)</div>
          </div>

          <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
              {stats.words.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
          </div>

          <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
              {stats.sentences.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Sentences</div>
          </div>

          <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-700 dark:text-red-300">
              {stats.paragraphs.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Paragraphs</div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-600 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
              {stats.readingTime} min
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Reading Time</div>
          </div>
        </div>

        {text && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-600 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Additional Information
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>Average words per sentence: {stats.sentences > 0 ? (stats.words / stats.sentences).toFixed(1) : 0}</div>
              <div>Average characters per word: {stats.words > 0 ? (stats.charactersNoSpaces / stats.words).toFixed(1) : 0}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordCounter;
