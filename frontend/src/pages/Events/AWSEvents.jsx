import React, { useState } from 'react';

const AWSEvents = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  // Function to add a new event
  const addEvent = (e) => {
    e.preventDefault();
    if (eventName && eventDate) {
      const newEvent = {
        name: eventName,
        date: eventDate,
        description: eventDescription,
      };
      setEvents([...events, newEvent]);
      setEventName('');
      setEventDate('');
      setEventDescription('');
    }
  };

  // Function to remove an event
  const removeEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  return (
    <div className="container">
      <h1>AWS Events Management</h1>
      <form onSubmit={addEvent}>
        <div className="form-group">
          <label htmlFor="eventName">Event Name:</label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventDate">Event Date:</label>
          <input
            type="date"
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventDescription">Event Description:</label>
          <textarea
            id="eventDescription"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            rows="3"
          />
        </div>
        <button type="submit">Add Event</button>
      </form>

      <h2>Upcoming Events</h2>
      <ul>
        {events.length === 0 ? (
          <li>No events available.</li>
        ) : (
          events.map((event, index) => (
            <li key={index}>
              <strong>{event.name}</strong> (Date: {event.date})
              <p>{event.description}</p>
              <button onClick={() => removeEvent(index)}>Remove</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AWSEvents;
