
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
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
  }, [isRunning]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Stopwatch
      </h2>

      <div className="bg-white dark:bg-gray-700 p-8 rounded-xl border border-gray-200 dark:border-gray-600">
        {/* Time Display */}
        <div className="text-center mb-8">
          <div className="text-6xl font-mono font-bold text-gray-800 dark:text-white mb-4">
            {formatTime(time)}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          {!isRunning ? (
            <Button onClick={handleStart} className="min-w-20">
              Start
            </Button>
          ) : (
            <Button onClick={handleStop} variant="destructive" className="min-w-20">
              Stop
            </Button>
          )}
          <Button onClick={handleLap} disabled={!isRunning} variant="outline" className="min-w-20">
            Lap
          </Button>
          <Button onClick={handleReset} variant="outline" className="min-w-20">
            Reset
          </Button>
        </div>

        {/* Lap Times */}
        {laps.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Lap Times
            </h3>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {laps.map((lapTime, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-600 rounded">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Lap {index + 1}
                  </span>
                  <span className="font-mono text-gray-800 dark:text-white">
                    {formatTime(lapTime)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stopwatch;
