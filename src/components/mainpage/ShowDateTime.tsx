import React, { useState } from 'react';
import dayjs from 'dayjs';
import DateSelector from './DateSelector'; // Import your DateSelector component

interface ShowDateTimeProps {
  date: string | number | Date;
  setUserSelectedDate: (date: Date) => void;
}

const ShowDateTime: React.FC<ShowDateTimeProps> = ({ date, setUserSelectedDate }) => {
  const [isDateSelectorOpen, setIsDateSelectorOpen] = useState(false);
  const formattedDate = dayjs(date).format('DD/MM/YYYY');

  const changeDate = (days: number) => {
    const newDate = dayjs(date).add(days, 'day').toDate();
    setUserSelectedDate(newDate);
  };

  const handleDateClick = () => {
    setIsDateSelectorOpen(!isDateSelectorOpen);
  };

  const handleSelectDate = (selectedDate: Date) => {
    setUserSelectedDate(selectedDate);
    setIsDateSelectorOpen(false);
  };

  return (
    <div className="flex items-center bg-white shadow py-3 px-10 font-bold relative">
      <button onClick={() => changeDate(-1)} className="p-2">
        <i className="fas fa-arrow-left"></i>
      </button>
      <span className="mx-4 cursor-pointer" onClick={handleDateClick}>
        {formattedDate}
      </span>
      {isDateSelectorOpen && (
        <div className="absolute top-full mt-2 right-1/2 translate-x-1/2">
          <DateSelector handleSelectDate={handleSelectDate} userSelectedDate={new Date(date)} />
        </div>
      )}
      <button onClick={() => changeDate(1)} className="p-2">
        <i className="fas fa-arrow-right"></i>
      </button>
    </div>
  );
};

export default ShowDateTime;
