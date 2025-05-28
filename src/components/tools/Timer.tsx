
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Timer = () => {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            // Play notification sound (you can add a sound file here)
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

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (timeLeft === 0) {
      const totalSeconds = minutes * 60 + seconds;
      if (totalSeconds > 0) {
        setTimeLeft(totalSeconds);
        setIsRunning(true);
        setIsFinished(false);
      }
    } else {
      setIsRunning(true);
      setIsFinished(false);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setIsFinished(false);
  };

  const handlePreset = (mins: number) => {
    setMinutes(mins);
    setSeconds(0);
    if (!isRunning) {
      setTimeLeft(0);
      setIsFinished(false);
    }
  };

  const getProgress = () => {
    const totalTime = minutes * 60 + seconds;
    if (totalTime === 0) return 0;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Timer
      </h2>

      <div className="bg-white dark:bg-gray-700 p-8 rounded-xl border border-gray-200 dark:border-gray-600">
        {/* Timer Display */}
        <div className="text-center mb-8">
          <div className={`text-6xl font-mono font-bold mb-4 ${
            isFinished ? 'text-red-500' : 'text-gray-800 dark:text-white'
          }`}>
            {timeLeft > 0 ? formatTime(timeLeft) : formatTime(minutes * 60 + seconds)}
          </div>
          
          {isFinished && (
            <div className="text-red-500 font-semibold text-lg animate-pulse">
              Time's Up! ⏰
            </div>
          )}
          
          {timeLeft > 0 && (
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${getProgress()}%` }}
              />
            </div>
          )}
        </div>

        {/* Time Input */}
        {!isRunning && timeLeft === 0 && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Minutes
              </label>
              <Input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                min="0"
                max="59"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Seconds
              </label>
              <Input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                min="0"
                max="59"
              />
            </div>
          </div>
        )}

        {/* Preset Buttons */}
        {!isRunning && timeLeft === 0 && (
          <div className="grid grid-cols-4 gap-2 mb-6">
            {[1, 5, 10, 15].map(preset => (
              <Button
                key={preset}
                onClick={() => handlePreset(preset)}
                variant="outline"
                size="sm"
              >
                {preset}m
              </Button>
            ))}
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex justify-center gap-4">
          {!isRunning ? (
            <Button 
              onClick={handleStart} 
              disabled={minutes === 0 && seconds === 0 && timeLeft === 0}
              className="min-w-20"
            >
              Start
            </Button>
          ) : (
            <Button onClick={handlePause} variant="outline" className="min-w-20">
              Pause
            </Button>
          )}
          <Button onClick={handleReset} variant="outline" className="min-w-20">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
