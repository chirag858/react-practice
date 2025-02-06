import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default CSS
import './app.css'; // Custom CSS for styling

const CalendarIcon = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleIconClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false); // Close the calendar after selecting a date
  };

  return (
    <div style={{marginLeft : "20px"}}>
      {/* Icon to click */}
      <div onClick={handleIconClick} style={{ cursor: 'pointer' }}>
        📅 
      </div>

      {/* Floating container for the calendar */}
      {showCalendar && (
        <div style={styles.calendarContainer}>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="custom-calendar" // Apply custom CSS class
          />
        </div>
      )}

      {/* Display the selected date */}
      <div style={{ marginTop: '10px' }}>
        {selectedDate.toDateString()}
      </div>
    </div>
  );
};

// Custom styles for the floating container
const styles = {
  calendarContainer: {
    position: 'absolute',
    top: '5px', // Adjust based on your layout
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000, // Ensure it appears above other elements
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    padding: '10px',
  },
};

export default CalendarIcon;