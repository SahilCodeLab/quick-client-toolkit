
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: Date;
}

const QuizMaker = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isTaking, setIsTaking] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Quiz creation state
  const [newQuiz, setNewQuiz] = useState({
    title: '',
    description: '',
    questions: [] as Question[]
  });

  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  });

  useEffect(() => {
    const savedQuizzes = localStorage.getItem('quizzes');
    if (savedQuizzes) {
      setQuizzes(JSON.parse(savedQuizzes).map((quiz: any) => ({
        ...quiz,
        createdAt: new Date(quiz.createdAt)
      })));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  const addQuestion = () => {
    if (!newQuestion.question.trim() || newQuestion.options.some(opt => !opt.trim())) {
      alert('Please fill in all fields for the question!');
      return;
    }

    const question: Question = {
      id: Date.now().toString(),
      question: newQuestion.question.trim(),
      options: newQuestion.options.map(opt => opt.trim()),
      correctAnswer: newQuestion.correctAnswer
    };

    setNewQuiz(prev => ({
      ...prev,
      questions: [...prev.questions, question]
    }));

    setNewQuestion({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    });
  };

  const createQuiz = () => {
    if (!newQuiz.title.trim() || newQuiz.questions.length === 0) {
      alert('Please add a title and at least one question!');
      return;
    }

    const quiz: Quiz = {
      id: Date.now().toString(),
      title: newQuiz.title.trim(),
      description: newQuiz.description.trim(),
      questions: newQuiz.questions,
      createdAt: new Date()
    };

    setQuizzes([...quizzes, quiz]);
    setNewQuiz({ title: '', description: '', questions: [] });
    setIsCreating(false);
  };

  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setIsTaking(true);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizCompleted(false);
  };

  const answerQuestion = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < selectedQuiz!.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed
      const correctAnswers = selectedQuiz!.questions.filter(
        (q, index) => q.correctAnswer === newAnswers[index]
      ).length;
      setScore(correctAnswers);
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setIsTaking(false);
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizCompleted(false);
  };

  const deleteQuiz = (quizId: string) => {
    setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
  };

  if (isTaking && selectedQuiz) {
    if (quizCompleted) {
      const percentage = Math.round((score / selectedQuiz.questions.length) * 100);
      
      return (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-700 p-8 rounded-xl border border-gray-200 dark:border-gray-600 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Quiz Completed! 🎉
            </h2>
            
            <div className="mb-6">
              <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {score}/{selectedQuiz.questions.length}
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-400">
                {percentage}% Correct
              </div>
            </div>

            <div className={`text-lg font-semibold mb-6 ${
              percentage >= 80 ? 'text-green-600' :
              percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {percentage >= 80 ? 'Excellent!' :
               percentage >= 60 ? 'Good Job!' : 'Keep Practicing!'}
            </div>

            <Button onClick={resetQuiz} className="mr-4">
              Back to Quizzes
            </Button>
            <Button onClick={() => startQuiz(selectedQuiz)} variant="outline">
              Retake Quiz
            </Button>
          </div>
        </div>
      );
    }

    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-700 p-8 rounded-xl border border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              {selectedQuiz.title}
            </h2>
            <Button onClick={resetQuiz} variant="outline" size="sm">
              Exit Quiz
            </Button>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-6">
              {currentQuestion.question}
            </h3>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => answerQuestion(index)}
                  variant="outline"
                  className="w-full text-left justify-start p-4 h-auto"
                >
                  <span className="mr-3 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isCreating) {
    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Create New Quiz
        </h2>

        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quiz Title *
              </label>
              <Input
                value={newQuiz.title}
                onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                placeholder="Enter quiz title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <Textarea
                value={newQuiz.description}
                onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })}
                placeholder="Enter quiz description"
                rows={3}
              />
            </div>
          </div>

          {/* Add Question Section */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Add Question
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Question *
                </label>
                <Textarea
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                  placeholder="Enter your question"
                  rows={2}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Options *
                </label>
                {newQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={newQuestion.correctAnswer === index}
                      onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: index })}
                      className="text-blue-600"
                    />
                    <Input
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...newQuestion.options];
                        newOptions[index] = e.target.value;
                        setNewQuestion({ ...newQuestion, options: newOptions });
                      }}
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    />
                  </div>
                ))}
              </div>
              
              <Button onClick={addQuestion} variant="outline" className="w-full">
                Add Question
              </Button>
            </div>
          </div>

          {/* Added Questions */}
          {newQuiz.questions.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-600 pt-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Questions Added ({newQuiz.questions.length})
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {newQuiz.questions.map((q, index) => (
                  <div key={q.id} className="p-3 bg-gray-100 dark:bg-gray-600 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">
                          {index + 1}. {q.question}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Correct: {q.options[q.correctAnswer]}
                        </div>
                      </div>
                      <Button
                        onClick={() => setNewQuiz(prev => ({
                          ...prev,
                          questions: prev.questions.filter(question => question.id !== q.id)
                        }))}
                        variant="ghost"
                        size="sm"
                        className="text-red-500"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={() => setIsCreating(false)} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button onClick={createQuiz} className="flex-1">
              Create Quiz
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Quiz Maker
        </h2>
        <Button onClick={() => setIsCreating(true)}>
          Create New Quiz
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
            <h3 className="text-xl font-medium mb-2">No Quizzes Yet</h3>
            <p>Create your first quiz to get started!</p>
          </div>
        ) : (
          quizzes.map(quiz => (
            <Card key={quiz.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {quiz.title}
                  </h3>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteQuiz(quiz.id);
                    }}
                    variant="ghost"
                    size="sm"
                    className="text-red-500"
                  >
                    <X size={16} />
                  </Button>
                </div>
                
                {quiz.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {quiz.description}
                  </p>
                )}
                
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {quiz.questions.length} questions • Created {quiz.createdAt.toLocaleDateString()}
                </div>
                
                <Button onClick={() => startQuiz(quiz)} className="w-full">
                  Take Quiz
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default QuizMaker;
