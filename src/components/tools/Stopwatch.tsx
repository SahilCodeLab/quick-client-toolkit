
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
    const mins = Math.floor(milliseconds / 60000);
    const secs = Math.floor((milliseconds % 60000) / 1000);
    const centisecs = Math.floor((milliseconds % 1000) / 10);
    
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${centisecs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    }
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Stopwatch</h2>

      {/* Time Display */}
      <div className="bg-gray-900 text-white p-8 rounded-2xl mb-8">
        <div className="text-5xl font-mono font-bold">
          {formatTime(time)}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        {!isRunning ? (
          <Button
            onClick={handleStart}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg"
            disabled={false}
          >
            Start
          </Button>
        ) : (
          <Button
            onClick={handleStop}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg"
          >
            Stop
          </Button>
        )}
        
        <Button
          onClick={handleLap}
          variant="outline"
          className="px-8 py-3 text-lg"
          disabled={!isRunning}
        >
          Lap
        </Button>
        
        <Button
          onClick={handleReset}
          variant="outline"
          className="px-8 py-3 text-lg"
        >
          Reset
        </Button>
      </div>

      {/* Lap Times */}
      {laps.length > 0 && (
        <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Lap Times</h3>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {laps.map((lap, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 px-3 bg-gray-50 dark:bg-gray-600 rounded"
              >
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Lap {laps.length - index}
                </span>
                <span className="font-mono text-gray-900 dark:text-white">
                  {formatTime(lap)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
