import React, { useState } from 'react';

const DateSelector = ({ onDateSelect }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handleDateClick = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    let updatedDates = [];
    // Remove the date if it's already selected.
    if (selectedDates.some(date => date.toDateString() === newDate.toDateString())) {
      updatedDates = selectedDates.filter(date => date.toDateString() !== newDate.toDateString());
    } else {
      // If one date is already selected, select the second date and order them.
      if (selectedDates.length === 1) {
        const start = selectedDates[0];
        const end = newDate;
        updatedDates = start > end ? [end, start] : [start, end];
      } else {
        // First date selection.
        updatedDates = [newDate];
      }
    }
    setSelectedDates(updatedDates);
    if (onDateSelect) {
      onDateSelect(updatedDates);
    }
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Check if a day is within the selected range.
  const isDateSelected = (day) => {
    const currentDate = new Date(year, month, day);
    if (selectedDates.length === 2) {
      const [start, end] = selectedDates;
      return currentDate >= start && currentDate <= end;
    }
    return selectedDates.some(date => date.toDateString() === currentDate.toDateString());
  };

  // Determines if the day is the start or end date for additional styling.
  const isStartOrEndDate = (day) => {
    if (selectedDates.length === 0) return false;
    const currentDate = new Date(year, month, day);
    return selectedDates.some(date => date.toDateString() === currentDate.toDateString());
  };

  return (
    <div className="bg-white rounded-lg p-3 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-gray-600 hover:text-gray-900">&lt;</button>
        <div className="font-medium">{monthName} {year}</div>
        <button onClick={nextMonth} className="text-gray-600 hover:text-gray-900">&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-1">
        {dayNames.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells before the first day */}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="h-8"></div>
        ))}
        {/* Generate days of the month */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const selected = isDateSelected(day);
          const edge = isStartOrEndDate(day);
          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`h-8 w-8 rounded-full flex items-center justify-center text-sm 
                      ${selected ? (edge ? 'bg-gray-900 text-white' : 'bg-gray-200') : 'hover:bg-gray-100'}`}
            >
              {day}
            </button>
          );
        })}
      </div>
      {selectedDates.length > 0 && (
        <div className="mt-4 text-xs text-gray-600">
          {selectedDates.length === 1 ? (
            <span>Selected: {selectedDates[0].toLocaleDateString()}</span>
          ) : (
            <span>
              {selectedDates[0].toLocaleDateString()} - {selectedDates[1].toLocaleDateString()}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default DateSelector;
