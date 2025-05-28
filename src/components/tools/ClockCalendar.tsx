
import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';

const ClockCalendar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeZone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Clock & Calendar
      </h2>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Digital Clock */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 rounded-2xl text-center">
            <div className="text-5xl font-mono font-bold mb-2">
              {formatTime(currentTime)}
            </div>
            <div className="text-lg opacity-90">
              {formatDate(currentTime)}
            </div>
            <div className="text-sm opacity-75 mt-2">
              {getTimeZone()}
            </div>
          </div>

          {/* World Clock */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              World Clock
            </h3>
            <div className="space-y-3">
              {[
                { city: 'New York', tz: 'America/New_York' },
                { city: 'London', tz: 'Europe/London' },
                { city: 'Tokyo', tz: 'Asia/Tokyo' },
                { city: 'Sydney', tz: 'Australia/Sydney' }
              ].map(({ city, tz }) => (
                <div key={city} className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">{city}</span>
                  <span className="font-mono text-gray-900 dark:text-white">
                    {currentTime.toLocaleTimeString('en-US', {
                      timeZone: tz,
                      hour12: true,
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Calendar
          </h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border-0"
          />
          
          {selectedDate && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-600 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                Selected Date
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {formatDate(selectedDate)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Day {Math.ceil((selectedDate.getTime() - new Date(selectedDate.getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24))} of {selectedDate.getFullYear()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {currentTime.getFullYear()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Year</div>
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {Math.ceil((currentTime.getTime() - new Date(currentTime.getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24))}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Day of Year</div>
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {Math.ceil(currentTime.getDate() / 7)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Week of Month</div>
        </div>
      </div>
    </div>
  );
};

export default ClockCalendar;
