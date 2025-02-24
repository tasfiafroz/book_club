// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import Modal from "react-modal";
// import axios from "axios";
// import "../styles/event.css";
// import Navigation from "../components/Navigation";

// const localizer = momentLocalizer(moment);

// const Event = () => {
//   const [events, setEvents] = useState([]);
//   const [currentView, setCurrentView] = useState("month");
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     description: "",
//     start: "",
//     end: "",
//   });
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   // Fetch events on component mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     axios
//       .get("http://localhost:4000/api/events", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         // ✅ Convert start & end to Date objects before storing
//         const formattedEvents = response.data.map(event => ({
//           ...event,
//           start: new Date(event.start), // Convert to Date
//           end: new Date(event.end),     // Convert to Date
//         }));
//         setEvents(formattedEvents);
//       })
//       .catch((error) => {
//         console.error("Error fetching events:", error);
//       });
//   }, []);

//   // Add a new event
//   const handleAddEvent = () => {
//     const token = localStorage.getItem("token");

//     if (!newEvent.title || !newEvent.start || !newEvent.end) {
//       alert("Please fill in all fields");
//       return;
//     }

//     const eventData = {
//       title: newEvent.title,
//       description: newEvent.description,
//       start: new Date(newEvent.start), // ✅ Convert input to Date
//       end: new Date(newEvent.end),     // ✅ Convert input to Date
//     };

//     axios
//       .post("http://localhost:4000/api/events", eventData, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         setEvents([...events, { ...response.data, start: new Date(response.data.start), end: new Date(response.data.end) }]);
//         setNewEvent({ title: "", description: "", start: "", end: "" });
//       })
//       .catch((error) => {
//         console.error("Error adding event:", error);
//       });
//   };

//   // Handle event click to show details
//   const handleEventClick = (event) => {
//     setSelectedEvent(event);
//   };

//   // Close modal
//   const closeModal = () => {
//     setSelectedEvent(null);
//   };

//   return (
//     <div className="event-page">
//       <Navigation />
//       <div className="calendar-container">
//         <div className="add-event-form">
//           <h2>Add Your Task</h2>
//           <input
//             type="text"
//             placeholder="Title"
//             value={newEvent.title}
//             onChange={(e) =>
//               setNewEvent({ ...newEvent, title: e.target.value })
//             }
//           />
//           <textarea
//             placeholder="Description"
//             value={newEvent.description}
//             onChange={(e) =>
//               setNewEvent({ ...newEvent, description: e.target.value })
//             }
//           />
//           <input
//             type="datetime-local"
//             value={newEvent.start}
//             onChange={(e) =>
//               setNewEvent({ ...newEvent, start: e.target.value })
//             }
//           />
//           <input
//             type="datetime-local"
//             value={newEvent.end}
//             onChange={(e) =>
//               setNewEvent({ ...newEvent, end: e.target.value })
//             }
//           />
//           <button onClick={handleAddEvent}>Add Event</button>
//         </div>

//         <div style={{ height: "500px", marginTop: "20px" }}>
//           <Calendar
//             localizer={localizer}
//             events={events}
//             startAccessor="start"
//             endAccessor="end"
//             onSelectEvent={handleEventClick}
//             view={currentView}
//             onView={setCurrentView}
//             views={["month", "week", "day", "agenda"]}
//           />
//         </div>

//         <Modal isOpen={!!selectedEvent} onRequestClose={closeModal}>
//           {selectedEvent && (
//             <div className="detail">
//               <h2>{selectedEvent.title}</h2>
//               <p>{selectedEvent.description}</p>
//               <button onClick={closeModal}>Close</button>
//             </div>
//           )}
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default Event;


import React, { useState, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import { EventContext } from "../context/EventContext";
import "../styles/event.css";
import Navigation from "../components/Navigation";

Modal.setAppElement("#root");

const localizer = momentLocalizer(moment);

const Event = () => {
  const { events, addEvent } = useContext(EventContext);
  const [currentView, setCurrentView] = useState("month");
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Add new event
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      alert("Please fill in all fields");
      return;
    }

    const eventData = {
      title: newEvent.title,
      description: newEvent.description,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
    };

    addEvent(eventData);
    setNewEvent({ title: "", description: "", start: "", end: "" });
  };

  // Handle event click
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="event-page">
      <Navigation />
      <div className="calendar-container">
        <div className="add-event-form">
          <h2>Add Your Task</h2>
          <input
            type="text"
            placeholder="Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          />
          <input
            type="datetime-local"
            value={newEvent.start}
            onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
          />
          <input
            type="datetime-local"
            value={newEvent.end}
            onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
          />
          <button onClick={handleAddEvent}>Add Event</button>
        </div>

        <div style={{ height: "500px", marginTop: "20px" }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleEventClick}
            view={currentView}
            onView={setCurrentView}
            views={["month", "week", "day", "agenda"]}
          />
        </div>

        <Modal isOpen={!!selectedEvent} onRequestClose={() => setSelectedEvent(null)}>
          {selectedEvent && (
            <div className="detail">
              <h2>{selectedEvent.title}</h2>
              <p>{selectedEvent.description}</p>
              <button onClick={() => setSelectedEvent(null)}>Close</button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Event;
