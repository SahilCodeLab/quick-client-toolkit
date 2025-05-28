
import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Import all tool components
import Calculator from '@/components/tools/Calculator';
import TodoList from '@/components/tools/TodoList';
import NotesApp from '@/components/tools/NotesApp';
import Stopwatch from '@/components/tools/Stopwatch';
import Timer from '@/components/tools/Timer';
import ClockCalendar from '@/components/tools/ClockCalendar';
import CurrencyConverter from '@/components/tools/CurrencyConverter';
import UnitConverter from '@/components/tools/UnitConverter';
import AgeCalculator from '@/components/tools/AgeCalculator';
import BMICalculator from '@/components/tools/BMICalculator';
import EMICalculator from '@/components/tools/EMICalculator';
import TipCalculator from '@/components/tools/TipCalculator';
import DiscountCalculator from '@/components/tools/DiscountCalculator';
import PasswordGenerator from '@/components/tools/PasswordGenerator';
import QRGenerator from '@/components/tools/QRGenerator';
import TextCaseConverter from '@/components/tools/TextCaseConverter';
import WordCounter from '@/components/tools/WordCounter';
import LoremGenerator from '@/components/tools/LoremGenerator';
import RandomNumber from '@/components/tools/RandomNumber';
import TypingTest from '@/components/tools/TypingTest';
import QuoteGenerator from '@/components/tools/QuoteGenerator';
import TaskPlanner from '@/components/tools/TaskPlanner';
import SpeedTest from '@/components/tools/SpeedTest';
import FileSizeConverter from '@/components/tools/FileSizeConverter';
import Flashcards from '@/components/tools/Flashcards';
import QuizMaker from '@/components/tools/QuizMaker';

const tools = [
  { id: 'calculator', name: 'Calculator', component: Calculator, category: 'Math' },
  { id: 'todo', name: 'To-Do List', component: TodoList, category: 'Productivity' },
  { id: 'notes', name: 'Notes', component: NotesApp, category: 'Productivity' },
  { id: 'stopwatch', name: 'Stopwatch', component: Stopwatch, category: 'Time' },
  { id: 'timer', name: 'Timer', component: Timer, category: 'Time' },
  { id: 'clock', name: 'Clock & Calendar', component: ClockCalendar, category: 'Time' },
  { id: 'currency', name: 'Currency Converter', component: CurrencyConverter, category: 'Finance' },
  { id: 'units', name: 'Unit Converter', component: UnitConverter, category: 'Converters' },
  { id: 'age', name: 'Age Calculator', component: AgeCalculator, category: 'Math' },
  { id: 'bmi', name: 'BMI Calculator', component: BMICalculator, category: 'Health' },
  { id: 'emi', name: 'EMI Calculator', component: EMICalculator, category: 'Finance' },
  { id: 'tip', name: 'Tip Calculator', component: TipCalculator, category: 'Finance' },
  { id: 'discount', name: 'Discount Calculator', component: DiscountCalculator, category: 'Finance' },
  { id: 'password', name: 'Password Generator', component: PasswordGenerator, category: 'Security' },
  { id: 'qr', name: 'QR Generator', component: QRGenerator, category: 'Utilities' },
  { id: 'textcase', name: 'Text Case Converter', component: TextCaseConverter, category: 'Text' },
  { id: 'wordcount', name: 'Word Counter', component: WordCounter, category: 'Text' },
  { id: 'lorem', name: 'Lorem Generator', component: LoremGenerator, category: 'Text' },
  { id: 'random', name: 'Random Number', component: RandomNumber, category: 'Utilities' },
  { id: 'typing', name: 'Typing Test', component: TypingTest, category: 'Games' },
  { id: 'quotes', name: 'Quote Generator', component: QuoteGenerator, category: 'Entertainment' },
  { id: 'planner', name: 'Task Planner', component: TaskPlanner, category: 'Productivity' },
  { id: 'speedtest', name: 'Speed Test', component: SpeedTest, category: 'Utilities' },
  { id: 'filesize', name: 'File Size Converter', component: FileSizeConverter, category: 'Converters' },
  { id: 'flashcards', name: 'Flashcards', component: Flashcards, category: 'Education' },
  { id: 'quiz', name: 'Quiz Maker', component: QuizMaker, category: 'Education' },
];

const categories = [...new Set(tools.map(tool => tool.category))];

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTool, setActiveTool] = useState('calculator');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ActiveComponent = tools.find(tool => tool.id === activeTool)?.component || Calculator;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MultiTools Pro
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="hidden md:block px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed lg:sticky top-16 left-0 z-40 w-80 h-[calc(100vh-4rem)] bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 overflow-y-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}>
          <div className="p-4">
            <div className="md:hidden mb-4">
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            
            {categories.map(category => {
              const categoryTools = filteredTools.filter(tool => tool.category === category);
              if (categoryTools.length === 0) return null;
              
              return (
                <div key={category} className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    {category}
                  </h3>
                  <div className="space-y-1">
                    {categoryTools.map(tool => (
                      <button
                        key={tool.id}
                        onClick={() => {
                          setActiveTool(tool.id);
                          setSidebarOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700",
                          activeTool === tool.id
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500"
                            : "text-gray-700 dark:text-gray-300"
                        )}
                      >
                        {tool.name}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 lg:p-8 min-h-[600px]">
              <ActiveComponent />
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
