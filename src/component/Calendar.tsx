import React, { useState } from "react";
import { colors, Color } from "./ColorEvent";
import "./Calendar.scss";
import TableCalendar from "./TableCalendar";

interface Events {
  [day: string]: string;
}

const Calendar: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [events, setEvents] = useState<Events>({});
  const [eventName, setEventName] = useState<string>("");
  const [eventColor, setEventColor] = useState<string>("#FF5252");

  const handleDayClick = (day: string) => {
    const selectedDayInt = parseInt(day, 10);
    if (selectedDayInt > 31) {
      return;
    }

    setSelectedDay(day);
    setEventName(events[day] || "");
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (eventName.trim() === "") {
      return;
    }
    setEvents((prevEvents) => ({ ...prevEvents, [selectedDay!]: eventName }));
    setSelectedDay(null);
    setEventName("");
  };

  const handleEventDelete = () => {
    if (selectedDay) {
      setEvents((prevEvents) => {
        const updatedEvents = { ...prevEvents };
        delete updatedEvents[selectedDay];
        return updatedEvents;
      });
      setSelectedDay(null);
    }
  };

  return (
    <div className="calendar">
      <TableCalendar
        firstDayOfMonth={new Date(2023, 0, 1)}
        monthEnd={new Date(2023, 0, 31)}
        events={events}
        handleDayClick={handleDayClick}
      />

      {/* Event form */}
      {selectedDay !== null && (
        <div className="event-form">
          <h3>{selectedDay}</h3>
          {events[selectedDay] ? (
            <div style={{ color: `${eventColor}` }}>
              <p>Event is: {events[selectedDay]}</p>
              <button onClick={handleEventDelete}>Delete Event</button>
            </div>
          ) : (
            <form onSubmit={handleEventSubmit}>
              <label>
                Event Name:
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="Enter Event name"
                />
              </label>

              <select
                value={eventColor}
                onChange={(e) => setEventColor(e.target.value)}
              >
                {colors.map((color: Color) => (
                  <option key={color.code} value={color.code}>
                    {color.name}
                  </option>
                ))}
              </select>
              <button type="submit" disabled={eventName.length < 3}>
                Create Event
              </button>
              <button onClick={() => setSelectedDay(null)}>Close</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;