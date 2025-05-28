
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState<Date>();
  const [targetDate, setTargetDate] = useState<Date>(new Date());
  const [ageData, setAgeData] = useState<any>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);
    
    if (birth > target) {
      alert('Birth date cannot be in the future!');
      return;
    }

    // Calculate exact age
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const daysInPrevMonth = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += daysInPrevMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate total days lived
    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // Calculate next birthday
    const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < target) {
      nextBirthday.setFullYear(target.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    setAgeData({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes,
      daysToNextBirthday,
      nextBirthday
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Age Calculator
      </h2>

      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600 mb-6">
        {/* Birth Date Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Birth Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !birthDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {birthDate ? format(birthDate, "PPP") : <span>Pick your birth date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={birthDate}
                  onSelect={setBirthDate}
                  disabled={(date) => date > new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Calculate Age On
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(targetDate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={targetDate}
                  onSelect={(date) => date && setTargetDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button onClick={calculateAge} className="w-full" disabled={!birthDate}>
          Calculate Age
        </Button>
      </div>

      {/* Results */}
      {ageData && (
        <div className="space-y-6">
          {/* Main Age Display */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-xl text-center">
            <div className="text-4xl font-bold mb-2">
              {ageData.years} Years, {ageData.months} Months, {ageData.days} Days
            </div>
            <div className="text-lg opacity-90">
              Your age on {format(targetDate, "PPP")}
            </div>
          </div>

          {/* Detailed Statistics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {ageData.totalDays.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Days Lived</div>
            </div>

            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {ageData.totalWeeks.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Weeks Lived</div>
            </div>

            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {ageData.totalHours.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Hours Lived</div>
            </div>

            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {ageData.totalMinutes.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Minutes Lived</div>
            </div>

            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {ageData.daysToNextBirthday}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Days to Next Birthday</div>
            </div>

            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {format(ageData.nextBirthday, "MMM d")}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Next Birthday</div>
            </div>
          </div>

          {/* Zodiac Sign */}
          {birthDate && (
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                Birth Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Day of Week Born:</span>
                  <span className="ml-2 font-medium text-gray-800 dark:text-white">
                    {format(birthDate, "EEEE")}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Birth Year:</span>
                  <span className="ml-2 font-medium text-gray-800 dark:text-white">
                    {birthDate.getFullYear()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;
