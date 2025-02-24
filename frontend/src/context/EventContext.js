import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = () => {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:4000/api/events", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const formattedEvents = response.data.map((event) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          }));
          setEvents(formattedEvents);
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    };
  
    fetchEvents();
  }, [events]); // Add `events` as a dependency  

  // Function to add event
  const addEvent = (newEvent) => {
    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:4000/api/events", newEvent, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEvents([...events, { ...response.data, start: new Date(response.data.start), end: new Date(response.data.end) }]);
      })
      .catch((error) => {
        console.error("Error adding event:", error);
      });
  };

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};
