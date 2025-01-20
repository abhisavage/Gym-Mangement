import { useState } from 'react';
import styled from 'styled-components';

const CalendarWrapper = styled.div`
  background: white;
  border-radius: 10px;
  padding: 15px;
  width: 300px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const MonthYear = styled.div`
  color: #1A1B4B;
  font-weight: 600;
  font-size: 18px;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const NavButton = styled.button`
  background: transparent;
  border: none;
  color: #1A1B4B;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 14px;
  
  &:hover {
    color: #FFD700;
  }
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 8px;
`;

const WeekDay = styled.div`
  color: #1A1B4B;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 0;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

const Day = styled.div`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  cursor: pointer;
  border-radius: 50%;
  
  ${({ isToday, isCurrentMonth, isSelected }) => `
    background: ${isToday ? '#1A1B4B' : isSelected ? '#e8e8ff' : 'transparent'};
    color: ${isToday ? 'white' : !isCurrentMonth ? '#ccc' : '#1A1B4B'};
    font-weight: ${isToday ? '600' : 'normal'};
    
    &:hover {
      background: ${isToday ? '#1A1B4B' : '#f0f0f0'};
    }
  `}
`;

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const today = new Date();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return {
      daysInMonth: lastDay.getDate(),
      startingDay: firstDay.getDay()
    };
  };

  const renderDays = () => {
    const days = [];
    const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
    const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    // Previous month days
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push(
        <Day key={`prev-${i}`} isCurrentMonth={false}>
          {prevMonthDays - i}
        </Day>
      );
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = 
        i === today.getDate() && 
        currentDate.getMonth() === today.getMonth() && 
        currentDate.getFullYear() === today.getFullYear();

      days.push(
        <Day 
          key={`current-${i}`} 
          isToday={isToday}
          isCurrentMonth={true}
          isSelected={selectedDate === i}
          onClick={() => setSelectedDate(i)}
        >
          {i}
        </Day>
      );
    }

    // Next month days
    const totalDays = days.length;
    let nextMonthDay = 1;
    while (totalDays + nextMonthDay <= 42) {
      days.push(
        <Day key={`next-${nextMonthDay}`} isCurrentMonth={false}>
          {nextMonthDay}
        </Day>
      );
      nextMonthDay++;
    }

    return days;
  };

  return (
    <CalendarWrapper>
      <CalendarHeader>
        <MonthYear>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </MonthYear>
        <NavButtons>
          <NavButton onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>
            ←
          </NavButton>
          <NavButton onClick={() => setCurrentDate(new Date())}>
            Today
          </NavButton>
          <NavButton onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>
            →
          </NavButton>
        </NavButtons>
      </CalendarHeader>

      <WeekDays>
        {weekDays.map(day => (
          <WeekDay key={day}>{day}</WeekDay>
        ))}
      </WeekDays>

      <DaysGrid>
        {renderDays()}
      </DaysGrid>
    </CalendarWrapper>
  );
};

export default Calendar;