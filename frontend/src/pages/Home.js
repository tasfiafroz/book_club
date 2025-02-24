// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useLogout } from '../hooks/useLogout';
// import { useAuthContext } from '../hooks/useAuthContext';
// import { useNavigate } from 'react-router-dom'
// import { useEffect, useState } from 'react'
// import '../styles/style.css'; 
// import Navigation from '../components/Navigation';


// const testimonials = [
//   {
//     img: "family garden.avif",
//     text: "SkyBloom has transformed our rooftop into a green paradise! The fresh vegetables and flowers have brought so much joy to our family.",
//     name: "Marnie Rotter",
//     job: "Urban Gardene"
//   },
//   {
//     img: "flower.avif",
//     text: "Thanks to SkyBloom, I now grow my own herbs and flowers. It's amazing how much greener and healthier my rooftop looks!",
//     name: "John Doe",
//     job: "Eco Enthusiast"
//   },
//   {
//     img: "fruit tree.jpg",
//     text: "Being part of this community has been a life-changing experience. My rooftop garden not only looks beautiful but also provides fresh fruits all year round!",
//     name: "Sarah Lee",
//     job: "Sustainable Living Advocate"
//   }
// ];


//     const Home = () => {

//       const { logout } = useLogout();
//       const { user } = useAuthContext();
    
//       const handleClick = () => {
//         logout();
//       };

//       const [currentIndex, setCurrentIndex] = useState(0);

//   const prevTestimonial = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
//   };

//   const nextTestimonial = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
//   };
      
    
//       return (
//     <div className="home-area">
//       <Navigation />
//       <div className="home">
//         <div className="left-container">
//           <div className="logo">
//             <span>
//               Sky<i className="fa-solid fa-leaf"></i>Bloom
//             </span>
//           </div>
//         </div>
//         <div className="right-container">
//           <div className="search-profile">
//             <div className="search-container">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="search-input"
//               />
//               <button className="search-button">
//                 <i className="fa fa-search"></i>
//               </button>
//             </div>
//             <div className="profile-logo">
//               <a href="/login">
//                 <i className="fa-solid fa-circle-user"></i>
//               </a>
//             </div>
//           </div>
//           <div className="main-content">
//             <div className="text-container">
//               <h1>Nature's Canvas, City's Grace</h1>
//               <p>
//                 SkyBloom is a rooftop gardening community where we transform
//                 urban skylines into peaceful green spaces. Each rooftop becomes
//                 a sanctuary, not only for plants to grow but for people to
//                 reconnect with nature. Our mission is to bring nature's touch
//                 to city life through sustainability, creativity, and
//                 collaboration.
//               </p>
//             </div>
//             <div className="img-container">
//               <div className="box1">
//                 <img src="/images/garden-1.jpg" alt="Garden 1" />
//               </div>
//               <div className="box2">
//                 <img src="/images/garden-7.jpg" alt="Garden 7" />
//               </div>
//               <div className="box3">
//                 <img src="/images/garden-12.jpg" alt="Garden 12" />
//               </div>
//               <div className="box4">
//                 <img src="/images/garden-9.jpg" alt="Garden 9" />
//               </div>
//               <div className="box5">
//                 <img src="/images/garden-3.avif" alt="Garden 3" />
//               </div>
//               <div className="box6">
//                 <img src="/images/garden-10.jpg" alt="Garden 10" />
//               </div>
//               <div className="box4">
//                 <img src="/images/garden-4.avif" alt="Garden 4" />
//               </div>
//               <div className="box5">
//                 <img src="/images/garden-13.jpg" alt="Garden 13" />
//               </div>
//               <div className="box6">
//                 <img src="/images/garden-6.jpg" alt="Garden 6" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>


//       <div className="guide-container-area">
//         <h2>Garden Guide</h2>
//         <div className="guide-container">
//           {[
//             { img: "houseplant.avif", title: "Houseplant Care", path: "/Houseplant" },
//             { img: "vegetable.jpg", title: "Vegetable Gardening" },
//             { img: "fruit tree.jpg", title: "Tree Planting & Care" },
//             { img: "family garden.avif", title: "Family Gardening & Activities" },
//             { img: "flower.avif", title: "Flower & Shrub Care" },
//             { img: "Propagation.jpg", title: "Houseplant Propagation" }
//           ].map((item, index) => (
//           <div key={index} className="guide-box" onClick={() => navigate(item.path)} style={{ cursor: "pointer" }} >
//           <img src={`/images/${item.img}`} alt={item.title} className="guide-image"  />
//           <p>{item.title}</p>
//           </div>
//       ))}
//         </div>
//       </div>


//       <div className="testimonial-body">
//               <h1 className="testimonial-title">Success Stories</h1>
//               <div className="testimonial-container">
//                 <button className="nav-btn prev" onClick={prevTestimonial}>
//                   <FaChevronLeft />
//                 </button>
//                 <div className="testimonial">
//                   <img src={`/images/${testimonials[currentIndex].img}`} alt="User" />
//                   <p>"{testimonials[currentIndex].text}"</p>
//                   <h3>{testimonials[currentIndex].name}</h3>
//                   <span>{testimonials[currentIndex].job}</span>
//                 </div>
//                 <button className="nav-btn next" onClick={nextTestimonial}>
//                   <FaChevronRight />
//                 </button>
//                 <div className="pagination">
//                   {testimonials.map((_, index) => (
//                     <span
//                       key={index}
//                       className={`dot ${index === currentIndex ? "active" : ""}`}
//                       onClick={() => setCurrentIndex(index)}
//                     ></span>
//                   ))}
//                 </div>
//               </div>
//             </div>



//     </div>
//   );
// };

// export default Home;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate import here
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import '../styles/style.css'; 
import Navigation from '../components/Navigation';


// Import the icons from react-icons
import { FaChevronLeft, FaChevronRight, FaFacebook, FaTwitter, FaInstagram  } from 'react-icons/fa'; 

const testimonials = [
  {
    img: "vegetable.jpg",
    text: "SkyBloom has transformed our rooftop into a green paradise! The fresh vegetables and flowers have brought so much joy to our family.",
    name: "Marnie Rotter",
    job: "Urban Gardene"
  },
  {
    img: "Propagation.jpg",
    text: "Thanks to SkyBloom, I now grow my own herbs and flowers. It's amazing how much greener and healthier my rooftop looks!",
    name: "John Doe",
    job: "Eco Enthusiast"
  },
  {
    img: "vegetable.jpg",
    text: "Being part of this community has been a life-changing experience. My rooftop garden not only looks beautiful but also provides fresh fruits all year round!",
    name: "Sarah Lee",
    job: "Sustainable Living Advocate"
  }
];

const Home = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate(); // Define navigate here
  
  const handleClick = () => {
    logout();
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  return (
    <div className="home-area">
      <Navigation />
      <div className="home">
        <div className="left-container">
          <div className="logo">
            <span>
              Sky<i className="fa-solid fa-leaf"></i>Bloom
            </span>
          </div>
        </div>
        <div className="right-container">
          <div className="search-profile">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />
              <button className="search-button">
                <i className="fa fa-search"></i>
              </button>
            </div>
            <div className="profile-logo">
              <a href="/login">
                <i className="fa-solid fa-circle-user"></i>
              </a>
            </div>
          </div>
          <div className="main-content">
            <div className="text-container">
              <h1>Nature's Canvas, City's Grace</h1>
              <p>
                SkyBloom is a rooftop gardening community where we transform
                urban skylines into peaceful green spaces. Each rooftop becomes
                a sanctuary, not only for plants to grow but for people to
                reconnect with nature. Our mission is to bring nature's touch
                to city life through sustainability, creativity, and
                collaboration.
              </p>
            </div>
            <div className="img-container">
              <div className="box1">
                <img src="/images/garden-1.jpg" alt="Garden 1" />
              </div>
              <div className="box2">
                <img src="/images/garden-7.jpg" alt="Garden 7" />
              </div>
              <div className="box3">
                <img src="/images/garden-12.jpg" alt="Garden 12" />
              </div>
              <div className="box4">
                <img src="/images/garden-9.jpg" alt="Garden 9" />
              </div>
              <div className="box5">
                <img src="/images/garden-3.avif" alt="Garden 3" />
              </div>
              <div className="box6">
                <img src="/images/garden-10.jpg" alt="Garden 10" />
              </div>
              <div className="box4">
                <img src="/images/garden-4.avif" alt="Garden 4" />
              </div>
              <div className="box5">
                <img src="/images/garden-13.jpg" alt="Garden 13" />
              </div>
              <div className="box6">
                <img src="/images/garden-6.jpg" alt="Garden 6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="guide-container-area">
        <h2>Garden Guide</h2>
        <div className="guide-container">
          {[{ img: "houseplant.avif", title: "Houseplant Care", path: "/Houseplant" },
            { img: "vegetable.jpg", title: "Vegetable Gardening" },
            { img: "houseplant.avif", title: "Tree Planting & Care" },
            { img: "Propagation.jpg", title: "Family Gardening & Activities" },
            { img: "flower.avif", title: "Flower & Shrub Care" },
            { img: "Propagation.jpg", title: "Houseplant Propagation" }]
            .map((item, index) => (
              <div key={index} className="guide-box" onClick={() => navigate(item.path)} style={{ cursor: "pointer" }}>
                <img src={`/images/${item.img}`} alt={item.title} className="guide-image" />
                <p>{item.title}</p>
              </div>
            ))}
        </div>
      </div>

      <div className="testimonial-body">
        <h1 className="testimonial-title">Success Stories</h1>
        <div className="testimonial-container">
          <button className="nav-btn prev" onClick={prevTestimonial}>
            <FaChevronLeft />
          </button>
          <div className="testimonial">
            <img src={`/images/${testimonials[currentIndex].img}`} alt="User" />
            <p>"{testimonials[currentIndex].text}"</p>
            <h3>{testimonials[currentIndex].name}</h3>
            <span>{testimonials[currentIndex].job}</span>
          </div>
          <button className="nav-btn next" onClick={nextTestimonial}>
            <FaChevronRight />
          </button>
          <div className="pagination">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>



      <footer className="footer">
        <div className="footer-container">
          <div className="logo" id='footer-logo'>
          <span>
              Sky<i className="fa-solid fa-leaf" id='leaf'></i>Bloom
            </span>
            <p className='footer-p'>Transforming rooftops into vibrant green spaces.</p>
          </div>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
        </div>
        <p className="footer-text">© 2025 SkyBloom. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

