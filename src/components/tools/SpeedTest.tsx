
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const SpeedTest = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [ping, setPing] = useState(0);
  const [progress, setProgress] = useState(0);

  const simulateSpeedTest = async () => {
    setIsRunning(true);
    setProgress(0);
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setPing(0);

    // Simulate ping test
    for (let i = 0; i <= 20; i++) {
      setProgress(i);
      setPing(Math.random() * 50 + 10);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Simulate download test
    for (let i = 21; i <= 60; i++) {
      setProgress(i);
      setDownloadSpeed(Math.random() * 100 + 20);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Simulate upload test
    for (let i = 61; i <= 100; i++) {
      setProgress(i);
      setUploadSpeed(Math.random() * 50 + 10);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Final results
    setDownloadSpeed(Math.round((Math.random() * 80 + 20) * 100) / 100);
    setUploadSpeed(Math.round((Math.random() * 40 + 10) * 100) / 100);
    setPing(Math.round((Math.random() * 30 + 5) * 100) / 100);
    setIsRunning(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Internet Speed Test
      </h2>

      <div className="bg-white dark:bg-gray-700 p-8 rounded-xl border border-gray-200 dark:border-gray-600">
        {/* Speed Meter */}
        <div className="text-center mb-8">
          <div className="relative w-64 h-32 mx-auto mb-6">
            <svg className="w-full h-full" viewBox="0 0 200 100">
              {/* Meter Background */}
              <path
                d="M 20 80 A 80 80 0 0 1 180 80"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
                className="dark:stroke-gray-600"
              />
              {/* Progress Arc */}
              <path
                d="M 20 80 A 80 80 0 0 1 180 80"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeDasharray={`${(progress / 100) * 251.3} 251.3`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
              {/* Center Text */}
              <text x="100" y="70" textAnchor="middle" className="fill-gray-800 dark:fill-white text-sm font-medium">
                {isRunning ? `${progress}%` : 'Ready'}
              </text>
            </svg>
          </div>

          {!isRunning && progress === 0 ? (
            <Button onClick={simulateSpeedTest} size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Speed Test
            </Button>
          ) : (
            <div className="text-lg font-medium text-gray-600 dark:text-gray-300">
              {isRunning ? 'Testing...' : 'Test Complete!'}
            </div>
          )}
        </div>

        {/* Results */}
        {(downloadSpeed > 0 || uploadSpeed > 0 || ping > 0) && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {downloadSpeed.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Download Mbps</div>
            </div>

            <div className="text-center p-6 bg-green-50 dark:bg-green-900 rounded-lg">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {uploadSpeed.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Upload Mbps</div>
            </div>

            <div className="text-center p-6 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {ping.toFixed(0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Ping ms</div>
            </div>
          </div>
        )}

        {progress === 100 && !isRunning && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-600 rounded-lg text-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Note: This is a simulated speed test for demonstration purposes.
              For accurate results, use your ISP's official speed test.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeedTest;
