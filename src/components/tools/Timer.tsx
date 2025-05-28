
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Timer = () => {
  const [totalTime, setTotalTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState('');
  const [inputSeconds, setInputSeconds] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            setIsRunning(false);
            // Timer finished - could add notification here
            alert('Timer finished!');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const setTimer = () => {
    const minutes = parseInt(inputMinutes) || 0;
    const seconds = parseInt(inputSeconds) || 0;
    const total = minutes * 60 + seconds;
    
    if (total > 0) {
      setTotalTime(total);
      setTimeLeft(total);
      setIsRunning(false);
    }
  };

  const handleStart = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
  };

  const handleClear = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setTotalTime(0);
    setInputMinutes('');
    setInputSeconds('');
  };

  const progressPercentage = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  return (
    <div className="max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Timer</h2>

      {/* Time Input */}
      <div className="mb-8">
        <div className="flex justify-center gap-2 mb-4">
          <div className="flex flex-col">
            <Input
              type="number"
              placeholder="Min"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(e.target.value)}
              className="w-20 text-center"
              min="0"
              max="999"
            />
            <label className="text-sm text-gray-500 mt-1">Minutes</label>
          </div>
          <div className="flex flex-col">
            <Input
              type="number"
              placeholder="Sec"
              value={inputSeconds}
              onChange={(e) => setInputSeconds(e.target.value)}
              className="w-20 text-center"
              min="0"
              max="59"
            />
            <label className="text-sm text-gray-500 mt-1">Seconds</label>
          </div>
        </div>
        <Button onClick={setTimer} className="w-full">
          Set Timer
        </Button>
      </div>

      {/* Timer Display */}
      <div className="relative mb-8">
        <div className="bg-gray-900 text-white p-8 rounded-2xl relative overflow-hidden">
          {/* Progress Bar */}
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercentage}%` }}
          />
          <div className="relative z-10">
            <div className="text-5xl font-mono font-bold">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        {!isRunning ? (
          <Button
            onClick={handleStart}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg"
            disabled={timeLeft === 0}
          >
            Start
          </Button>
        ) : (
          <Button
            onClick={handlePause}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 text-lg"
          >
            Pause
          </Button>
        )}
        
        <Button
          onClick={handleReset}
          variant="outline"
          className="px-8 py-3 text-lg"
          disabled={totalTime === 0}
        >
          Reset
        </Button>
        
        <Button
          onClick={handleClear}
          variant="outline"
          className="px-8 py-3 text-lg"
        >
          Clear
        </Button>
      </div>

      {/* Quick Set Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setInputMinutes('5');
            setInputSeconds('0');
            setTimer();
          }}
          className="text-sm"
        >
          5 min
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setInputMinutes('10');
            setInputSeconds('0');
            setTimer();
          }}
          className="text-sm"
        >
          10 min
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setInputMinutes('15');
            setInputSeconds('0');
            setTimer();
          }}
          className="text-sm"
        >
          15 min
        </Button>
      </div>
    </div>
  );
};

export default Timer;
