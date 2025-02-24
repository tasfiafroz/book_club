import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/SuccessStories.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [form, setForm] = useState({ name: "", job: "", text: "", img: null });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/testimonials");
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("job", form.job);
    formData.append("text", form.text);
    formData.append("img", form.img);

    try {
      await axios.post("http://localhost:5000/testimonials", formData);
      toast.success("Testimonial submitted!");
      fetchTestimonials();
      setForm({ name: "", job: "", text: "", img: null });
    } catch (error) {
      toast.error("Submission failed");
      console.error(error);
    }
  };

  const nextTestimonial = () => setCurrentIndex((currentIndex + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentIndex((currentIndex - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="testimonial-body">
      <h1 className="testimonial-title">Success Stories</h1>
      <div className="testimonial-container">
        <button className="nav-btn prev" onClick={prevTestimonial}>{"<"}</button>

        {testimonials.length > 0 ? (
          <div className="testimonial">
            <img src={`http://localhost:5000${testimonials[currentIndex].img}`} alt="User" />
            <p>"{testimonials[currentIndex].text}"</p>
            <h3>{testimonials[currentIndex].name}</h3>
            <span>{testimonials[currentIndex].job}</span>
          </div>
        ) : (
          <p>No testimonials yet!</p>
        )}

        <button className="nav-btn next" onClick={nextTestimonial}>{">"}</button>
      </div>

      <form onSubmit={handleSubmit} className="testimonial-form">
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="text" placeholder="Profession" value={form.job} onChange={(e) => setForm({ ...form, job: e.target.value })} required />
        <textarea placeholder="Your success story" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} required></textarea>
        <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, img: e.target.files[0] })} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Testimonials;
