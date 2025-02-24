// import React, { useState, useEffect } from "react";
// import "../styles/Consultancy.css";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Navigation from "../components/Navigation";

// export default function Consultancy() {
//   const [consultants, setConsultants] = useState([]);
//   const [selectedConsultant, setSelectedConsultant] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     contact: "",
//     email: "",
//     problem: "",
//     appointmentDate: "",
//   });

//   useEffect(() => {
//     const fetchConsultants = async () => {
//       try {
//         const response = await fetch("http://localhost:4000/api/consultants");
//         if (!response.ok) throw new Error("Failed to fetch consultants");
//         const data = await response.json();
//         setConsultants(data);
//       } catch (error) {
//         console.error("Error fetching consultants:", error);
//       }
//     };

//     fetchConsultants();
//   }, []);

//   const handleSelectConsultant = (consultant) => setSelectedConsultant(consultant);
//   const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedConsultant) return toast.error("Please select a consultant.");

//     const appointmentDetails = {
//       consultantEmail: selectedConsultant.email,
//       consultantName: selectedConsultant.name,
//       name: formData.name,
//       contact: formData.contact,
//       email: formData.email,
//       problem: formData.problem,
//       appointmentDate: formData.appointmentDate,
//     };

//     try {
//       const response = await fetch("http://localhost:4000/api/appointments/send-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(appointmentDetails),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         toast.success("Appointment booked! Email sent.");
//         setSelectedConsultant(null);
//         setFormData({ name: "", contact: "", email: "", problem: "", appointmentDate: "" });
//       } else {
//         toast.error("Failed to send email: " + data.message);
//       }
//     } catch (error) {
//       console.error("Error sending email:", error);
//       toast.error("Error sending email. Try again.");
//     }
//   };

//   return (
//     <div>
//       <Navigation />
//     <div className="consultancy-container">
//       <h1>Consultancy</h1>

//       {!selectedConsultant ? (
//         <div className="consultants-grid">
//           {consultants.length > 0 ? (
//             consultants.map((consultant) => (
//               <div key={consultant._id} className="consultant-card">
//                 <h2>{consultant.name}</h2>
//                 <p>{consultant.email}</p>
//                 <p>{consultant.designation}</p>
//                 <button onClick={() => handleSelectConsultant(consultant)}>Book Appointment</button>
//               </div>
//             ))
//           ) : (
//             <p>Loading consultants...</p>
//           )}
//         </div>
//       ) : (
//         <form className="appointment-form" onSubmit={handleSubmit}>
//           <h2>Booking Appointment with {selectedConsultant.name}</h2>
//           <input name="name" type="text" placeholder="Your Name" value={formData.name} onChange={handleInputChange} required />
//           <input name="contact" type="text" placeholder="Contact Number" value={formData.contact} onChange={handleInputChange} required />
//           <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
//           <textarea name="problem" placeholder="Describe your problem" value={formData.problem} onChange={handleInputChange} required></textarea>
//           <input name="appointmentDate" type="date" value={formData.appointmentDate} onChange={handleInputChange} required />
//           <button type="submit">Confirm Appointment</button>
//         </form>
//       )}
//     </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import "../styles/Consultancy.css";
import Navigation from "../components/Navigation";

export default function Consultancy() {
  const [consultants] = useState([
    {
      id: 1,
      name: "Dr. Jane Smith",
      designation: "PhD in Horticulture",
      email: "u2004102@student.cuet.ac.bd"
    },
    {
      id: 2,
      name: "Mr. John Doe",
      designation: "MSc in Agricultural Science",
      email: "u2004108@student.cuet.ac.bd"
    },
    {
      id: 3,
      name: "Ms. Emily Johnson",
      designation: "Landscape Architect",
      email: "u2004123@student.cuet.ac.bd"
    },
  ]);

  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    problem: "",
    appointmentDate: "",
  });

  const handleSelectConsultant = (consultant) => {
    setSelectedConsultant(consultant);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedConsultant) {
      alert("Please select a consultant before booking.");
      return;
    }

    // Appointment details with consultant ID
    const appointmentDetails = {
      name: formData.name,
      contact: formData.contact,
      email: formData.email,
      problem: formData.problem,
      appointmentDate: formData.appointmentDate,
      consultantId: selectedConsultant.id, // ✅ Sending consultant ID
    };

    try {
      const response = await fetch("http://localhost:5001/api/appointments/send-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Ensure user authentication
        },
        body: JSON.stringify(appointmentDetails),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Appointment booked successfully, and email sent to the consultant.");
        setSelectedConsultant(null);
        setFormData({ name: "", contact: "", email: "", problem: "", appointmentDate: "" });
      } else {
        alert(data.error || "Error booking appointment.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to book appointment.");
    }
  };

  return (
    <div>
      <Navigation />
    <div className="consultancy-container">
      <h1 className="consultancy-title">Consultancy</h1>

      {!selectedConsultant ? (
        <>
          <div className="consultants-grid">
            {consultants.map((consultant) => (
              <div key={consultant.id} className="consultant-card">
                <h2 className="consultant-name">{consultant.name}</h2>
                <p className="consultant-designation">{consultant.designation}</p>
                <button className="book-button" onClick={() => handleSelectConsultant(consultant)}>
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <form className="appointment-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Booking Appointment with {selectedConsultant.name}</h2>

          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input id="name" name="name" type="text" placeholder="Enter your name"
              value={formData.name} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact Number</label>
            <input id="contact" name="contact" type="text" placeholder="Enter your contact number"
              value={formData.contact} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input id="email" name="email" type="email" placeholder="Enter your email"
              value={formData.email} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="problem">Describe Your Problem</label>
            <textarea id="problem" name="problem" placeholder="Describe your problem"
              value={formData.problem} onChange={handleInputChange} required></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="appointmentDate">Appointment Date</label>
            <input id="appointmentDate" name="appointmentDate" type="date"
              value={formData.appointmentDate} onChange={handleInputChange} required />
          </div>

          <button type="submit" className="submit-button">
            Confirm Appointment
          </button>
        </form>
      )}
    </div>
    </div>
  );
}

