
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const SpeedTest = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTest, setCurrentTest] = useState<'download' | 'upload' | 'ping' | null>(null);
  const [results, setResults] = useState({
    download: 0,
    upload: 0,
    ping: 0
  });

  const runSpeedTest = () => {
    setIsRunning(true);
    setProgress(0);
    setResults({ download: 0, upload: 0, ping: 0 });

    // Simulate ping test
    setCurrentTest('ping');
    setTimeout(() => {
      const pingValue = Math.floor(Math.random() * 50) + 10; // 10-60ms
      setResults(prev => ({ ...prev, ping: pingValue }));
      setProgress(33);

      // Simulate download test
      setCurrentTest('download');
      setTimeout(() => {
        const downloadSpeed = Math.floor(Math.random() * 100) + 50; // 50-150 Mbps
        setResults(prev => ({ ...prev, download: downloadSpeed }));
        setProgress(66);

        // Simulate upload test
        setCurrentTest('upload');
        setTimeout(() => {
          const uploadSpeed = Math.floor(Math.random() * 50) + 20; // 20-70 Mbps
          setResults(prev => ({ ...prev, upload: uploadSpeed }));
          setProgress(100);
          setCurrentTest(null);
          setIsRunning(false);
        }, 2000);
      }, 2000);
    }, 1000);
  };

  const getSpeedRating = (speed: number, type: 'download' | 'upload') => {
    if (type === 'download') {
      if (speed >= 100) return { text: 'Excellent', color: 'text-green-600' };
      if (speed >= 50) return { text: 'Good', color: 'text-blue-600' };
      if (speed >= 25) return { text: 'Fair', color: 'text-yellow-600' };
      return { text: 'Poor', color: 'text-red-600' };
    } else {
      if (speed >= 50) return { text: 'Excellent', color: 'text-green-600' };
      if (speed >= 25) return { text: 'Good', color: 'text-blue-600' };
      if (speed >= 10) return { text: 'Fair', color: 'text-yellow-600' };
      return { text: 'Poor', color: 'text-red-600' };
    }
  };

  const getPingRating = (ping: number) => {
    if (ping <= 20) return { text: 'Excellent', color: 'text-green-600' };
    if (ping <= 50) return { text: 'Good', color: 'text-blue-600' };
    if (ping <= 100) return { text: 'Fair', color: 'text-yellow-600' };
    return { text: 'Poor', color: 'text-red-600' };
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Internet Speed Test
      </h2>

      <div className="bg-white dark:bg-gray-700 p-8 rounded-xl border border-gray-200 dark:border-gray-600">
        {/* Speed Gauge */}
        <div className="text-center mb-8">
          <div className="relative w-48 h-48 mx-auto mb-6">
            {/* Gauge Background */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200 dark:text-gray-600"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${progress * 2.51} 251`}
                className="text-blue-500 transition-all duration-1000"
              />
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 dark:text-white">
                  {Math.round(progress)}%
                </div>
                {currentTest && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    Testing {currentTest}...
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button 
            onClick={runSpeedTest} 
            disabled={isRunning}
            className="px-8 py-3 text-lg"
          >
            {isRunning ? 'Testing...' : 'Start Speed Test'}
          </Button>
        </div>

        {/* Results */}
        {(results.download > 0 || results.upload > 0 || results.ping > 0) && (
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {/* Download Speed */}
            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {results.download}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Mbps Download
              </div>
              {results.download > 0 && (
                <div className={`text-sm font-medium ${getSpeedRating(results.download, 'download').color}`}>
                  {getSpeedRating(results.download, 'download').text}
                </div>
              )}
            </div>

            {/* Upload Speed */}
            <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {results.upload}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Mbps Upload
              </div>
              {results.upload > 0 && (
                <div className={`text-sm font-medium ${getSpeedRating(results.upload, 'upload').color}`}>
                  {getSpeedRating(results.upload, 'upload').text}
                </div>
              )}
            </div>

            {/* Ping */}
            <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {results.ping}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                ms Ping
              </div>
              {results.ping > 0 && (
                <div className={`text-sm font-medium ${getPingRating(results.ping).color}`}>
                  {getPingRating(results.ping).text}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Information */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-600 rounded-lg">
          <h4 className="font-medium text-gray-800 dark:text-white mb-2">
            About This Test
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This is a simulated speed test for demonstration purposes. In a real application, this would
            measure your actual internet connection speed by downloading and uploading test files
            and measuring latency to servers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpeedTest;
