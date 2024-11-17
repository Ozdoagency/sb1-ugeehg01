import { FC, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

type Props = {
  value: string;
  onChange: (value: string) => void;
  minDate?: string;
};

export const DateInput: FC<Props> = ({ value, onChange, minDate }) => {
  const { language } = useLanguage();
  const t = translations[language].quiz.dateInput;
  
  const today = new Date();
  const defaultMinDate = minDate ? new Date(minDate) : today;
  const [currentDate, setCurrentDate] = useState(value ? new Date(value) : today);
  const [selectedTime, setSelectedTime] = useState('10:00');
  const timeSliderRef = useRef<HTMLDivElement>(null);

  const months = t.months;
  const weekDays = t.weekDays;

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00'
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateSelect = (date: Date) => {
    const newDate = new Date(date);
    const [hours, minutes] = selectedTime.split(':');
    newDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    onChange(newDate.toISOString());
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (value) {
      const date = new Date(value);
      const [hours, minutes] = time.split(':');
      date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
      onChange(date.toISOString());
    }
  };

  const renderCalendar = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startingDayIndex = (firstDayOfMonth.getDay() + 6) % 7; // Adjust for Monday start
    const daysInMonth = lastDayOfMonth.getDate();
    const selectedDate = value ? new Date(value) : null;

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayIndex; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-10" />
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const isPast = date < new Date(today.setHours(0, 0, 0, 0));

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(date)}
          disabled={isPast}
          className={`h-10 rounded-lg flex items-center justify-center text-sm transition-all duration-200 ${
            isSelected
              ? 'bg-blue-600 text-white font-medium'
              : isToday
              ? 'bg-blue-50 text-blue-600 font-medium hover:bg-blue-100'
              : isPast
              ? 'text-gray-300 cursor-not-allowed'
              : 'hover:bg-gray-50 text-gray-700'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="grid md:grid-cols-[1fr,auto] gap-6">
        {/* Calendar */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </button>
            <h3 className="text-lg font-medium text-gray-900">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="h-10 flex items-center justify-center text-sm font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {renderCalendar()}
          </div>
        </div>

        {/* Time Selection - Desktop */}
        <div className="hidden md:block bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-gray-700">
            <Clock className="w-5 h-5" />
            <h3 className="font-medium">{t.selectTime}</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 max-h-[360px] overflow-y-auto pr-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  selectedTime === time
                    ? 'bg-blue-600 text-white font-medium'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Time Selection - Mobile */}
      <div className="md:hidden mt-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center gap-2 text-gray-700 mb-4">
            <Clock className="w-5 h-5" />
            <h3 className="font-medium">{t.selectTime}</h3>
          </div>
          <div className="relative">
            <div
              ref={timeSliderRef}
              className="flex gap-2 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth hide-scrollbar"
            >
              {timeSlots.map((time) => (
                <button
                  key={time}
                  data-selected={selectedTime === time}
                  onClick={() => handleTimeSelect(time)}
                  className={`flex-none snap-center px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                    selectedTime === time
                      ? 'bg-blue-600 text-white font-medium scale-110'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Date and Time Display */}
      {value && (
        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-center text-blue-700">
            {t.selectedDateTime}{' '}
            <span className="font-medium">
              {new Date(value).toLocaleDateString(t.locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
              {' '}{t.at}{' '}
              {value.split('T')[1].substring(0, 5)}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};