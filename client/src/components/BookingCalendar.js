// src/components/BookingCalendar.js
import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const BookingCalendar = ({
  onDateSelection,
  selectedDates,
  unavailableDates = [],
  currentMonth,
  onMonthChange,
}) => {
  const [hoverDate, setHoverDate] = useState(null);

  const disabledDates = Array.isArray(unavailableDates) ? unavailableDates : [];

  const isDateUnavailable = (date) =>
    disabledDates.some((d) => d.toDateString() === date.toDateString());

  const handleDateClick = (date) => {
    if (isDateUnavailable(date)) return;

    const { checkIn, checkOut } = selectedDates;
    if (!checkIn || (checkIn && checkOut)) {
      onDateSelection(date, null);
      return;
    }

    // only checkIn exists
    if (date < checkIn) {
      onDateSelection(date, checkIn);
    } else {
      onDateSelection(checkIn, date);
    }
  };

  const isDateInRange = (date) => {
    const { checkIn, checkOut } = selectedDates;
    if (!checkIn) return false;
    if (!checkOut && hoverDate) {
      return (date > checkIn && date <= hoverDate) || (date < checkIn && date >= hoverDate);
    }
    if (checkIn && checkOut) {
      return date > checkIn && date < checkOut;
    }
    return false;
  };

  const prevMonth = () =>
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () =>
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y, m) => new Date(y, m, 1).getDay();

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const first = getFirstDayOfMonth(year, month);
    const cells = [];

    for (let i = 0; i < first; i++) {
      cells.push(<div key={`empty-${i}`} className="h-10" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const isToday = new Date().toDateString() === date.toDateString();
      const isSelected =
        (selectedDates.checkIn && selectedDates.checkIn.toDateString() === date.toDateString()) ||
        (selectedDates.checkOut && selectedDates.checkOut.toDateString() === date.toDateString());
      const inRange = isDateInRange(date);
      const unavailable = isDateUnavailable(date);

      cells.push(
        <div
          key={d}
          className={`
            h-10 relative flex items-center justify-center cursor-pointer
            ${unavailable ? "cursor-not-allowed" : "hover:bg-gray-100"}
            ${isSelected ? "bg-blue-600 text-white hover:bg-blue-600" : ""}
            ${inRange ? "bg-blue-100" : ""}
            ${isToday ? "font-bold" : ""}
          `}
          onClick={() => !unavailable && handleDateClick(date)}
          onMouseEnter={() => {
            if (selectedDates.checkIn && !selectedDates.checkOut) {
              setHoverDate(date);
            }
          }}
          onMouseLeave={() => setHoverDate(null)}
        >
          <span className={unavailable ? "text-gray-300" : ""}>{d}</span>
          {unavailable && <div className="absolute inset-0 bg-gray-200 opacity-50" />}
        </div>
      );
    }

    return cells;
  };

  const monthNames = [
    "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"
  ];

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Select dates</h3>
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100">
          <ChevronLeftIcon size={20} />
        </button>
        <div className="font-medium">
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </div>
        <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100">
          <ChevronRightIcon size={20} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-center text-xs text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
      <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
        <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
        <span>Unavailable</span>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Check-in</label>
          <div className="mt-1 p-2 border border-gray-300 rounded-md bg-gray-50">
            {selectedDates.checkIn
              ? selectedDates.checkIn.toLocaleDateString()
              : "Select date"}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Check-out</label>
          <div className="mt-1 p-2 border border-gray-300 rounded-md bg-gray-50">
            {selectedDates.checkOut
              ? selectedDates.checkOut.toLocaleDateString()
              : "Select date"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
