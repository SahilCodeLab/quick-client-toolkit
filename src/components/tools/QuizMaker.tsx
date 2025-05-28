
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

const QuizMaker = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isTaking, setIsTaking] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Form states
  const [newQuizTitle, setNewQuizTitle] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newOptions, setNewOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('quizzes');
    if (saved) {
      setQuizzes(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  const createNewQuiz = () => {
    if (!newQuizTitle.trim()) return;

    const quiz: Quiz = {
      id: Date.now().toString(),
      title: newQuizTitle.trim(),
      questions: []
    };

    setQuizzes([...quizzes, quiz]);
    setCurrentQuiz(quiz);
    setNewQuizTitle('');
    setIsCreating(true);
  };

  const addQuestion = () => {
    if (!currentQuiz || !newQuestion.trim() || newOptions.some(opt => !opt.trim())) return;

    const question: Question = {
      id: Date.now().toString(),
      question: newQuestion.trim(),
      options: newOptions.map(opt => opt.trim()),
      correctAnswer: correctOption
    };

    const updatedQuiz = {
      ...currentQuiz,
      questions: [...currentQuiz.questions, question]
    };

    setQuizzes(quizzes.map(q => q.id === currentQuiz.id ? updatedQuiz : q));
    setCurrentQuiz(updatedQuiz);
    
    // Reset form
    setNewQuestion('');
    setNewOptions(['', '', '', '']);
    setCorrectOption(0);
  };

  const startQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
    setIsTaking(true);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResults(false);
  };

  const answerQuestion = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < (currentQuiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    if (!currentQuiz) return 0;
    
    let correct = 0;
    currentQuiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    
    return Math.round((correct / currentQuiz.questions.length) * 100);
  };

  if (showResults && currentQuiz) {
    const score = calculateScore();
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-700 p-8 rounded-xl border border-gray-200 dark:border-gray-600 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Quiz Complete!
          </h2>
          
          <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg mb-6">
            <div className="text-4xl font-bold text-blue-700 dark:text-blue-300 mb-2">
              {score}%
            </div>
            <div className="text-lg text-gray-600 dark:text-gray-400">
              You got {userAnswers.filter((answer, index) => answer === currentQuiz.questions[index].correctAnswer).length} out of {currentQuiz.questions.length} questions correct
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={() => {
              setIsTaking(false);
              setShowResults(false);
              setCurrentQuiz(null);
            }}>
              Back to Quizzes
            </Button>
            <Button onClick={() => startQuiz(currentQuiz)} variant="outline">
              Retake Quiz
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isTaking && currentQuiz) {
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-700 p-8 rounded-xl border border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              {currentQuiz.title}
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-6">
              {currentQuestion.question}
            </h3>

            <RadioGroup
              value={userAnswers[currentQuestionIndex]?.toString()}
              onValueChange={(value) => answerQuestion(parseInt(value))}
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between">
            <Button
              onClick={() => {
                setIsTaking(false);
                setCurrentQuiz(null);
              }}
              variant="outline"
            >
              Exit Quiz
            </Button>
            <Button
              onClick={nextQuestion}
              disabled={userAnswers[currentQuestionIndex] === undefined}
            >
              {currentQuestionIndex === currentQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isCreating && currentQuiz) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Creating: {currentQuiz.title}
            </h2>
            <Button
              onClick={() => {
                setIsCreating(false);
                setCurrentQuiz(null);
              }}
              variant="outline"
            >
              Done Creating
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Question</Label>
              <Textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Enter your question"
                rows={3}
              />
            </div>

            <div>
              <Label className="text-base font-medium">Answer Options</Label>
              <div className="space-y-3 mt-2">
                {newOptions.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="correct"
                      checked={correctOption === index}
                      onChange={() => setCorrectOption(index)}
                      className="text-blue-600"
                    />
                    <Input
                      value={option}
                      onChange={(e) => {
                        const updated = [...newOptions];
                        updated[index] = e.target.value;
                        setNewOptions(updated);
                      }}
                      placeholder={`Option ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Select the radio button next to the correct answer
              </div>
            </div>

            <Button
              onClick={addQuestion}
              disabled={!newQuestion.trim() || newOptions.some(opt => !opt.trim())}
              className="w-full"
            >
              Add Question ({currentQuiz.questions.length} added)
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Quiz Maker
      </h2>

      {/* Create New Quiz */}
      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Create New Quiz
        </h3>
        
        <div className="flex gap-3">
          <Input
            value={newQuizTitle}
            onChange={(e) => setNewQuizTitle(e.target.value)}
            placeholder="Enter quiz title"
            className="flex-1"
          />
          <Button onClick={createNewQuiz} disabled={!newQuizTitle.trim()}>
            Create Quiz
          </Button>
        </div>
      </div>

      {/* Quiz List */}
      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Your Quizzes ({quizzes.length})
        </h3>

        {quizzes.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No quizzes yet. Create your first quiz above!
          </div>
        ) : (
          <div className="space-y-3">
            {quizzes.map(quiz => (
              <div key={quiz.id} className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">
                    {quiz.title}
                  </h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {quiz.questions.length} questions
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => startQuiz(quiz)}
                    disabled={quiz.questions.length === 0}
                    size="sm"
                  >
                    Take Quiz
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrentQuiz(quiz);
                      setIsCreating(true);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizMaker;
