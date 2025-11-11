import React, { useState } from "react";
import { FaCar, FaSprayCan, FaMagic, FaTint, FaTools, FaLeaf } from "react-icons/fa";
import heroImage from "../assets/homephoto.jpg";

function Home() {
  const [expandedService, setExpandedService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const services = [
    { icon: <FaCar />, title: "Exterior Wash & Wax", description: "Complete exterior cleaning, waxing, and polishing to make your car shine like new." },
    { icon: <FaSprayCan />, title: "Interior Detailing", description: "Thorough interior cleaning including carpets, seats, dashboards, and vents." },
    { icon: <FaMagic />, title: "Paint Correction", description: "Remove scratches, swirl marks, and restore your vehicle's paint to a perfect finish." },
    { icon: <FaTint />, title: "Window & Glass Care", description: "Crystal clear windows, mirrors, and glass surfaces for full visibility and shine." },
    { icon: <FaTools />, title: "Engine Detailing", description: "Clean and protect your engine bay safely for improved performance and aesthetics." },
    { icon: <FaLeaf />, title: "Ceramic Coating", description: "High-quality protective coating to keep your vehicle looking new longer." },
  ];

  const scrollToForm = () => {
    document.getElementById("contact-form").scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch("https://formspree.io/f/xdkyopld", {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    }).then((response) => {
      if (response.ok) {
        setSubmitted(true);
        form.reset();
        setFormData({ name: "", email: "", phone: "", message: "", service: "" });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        response.json().then((data) => {
          alert(data.error || "Oops! There was a problem submitting your form.");
        });
      }
    });
  };

  const handleServiceClick = (serviceTitle) => {
    setFormData({ ...formData, service: serviceTitle, message: `I am interested in booking: ${serviceTitle}` });
    scrollToForm();
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <h1 className="hero-title">Professional Auto Detailing in Utah</h1>
        <p className="hero-subtitle">Premium care. Immaculate results. Right at your driveway.</p>
        <button className="book-now-btn" onClick={scrollToForm}>Book Now</button>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <h2>Why Choose Wasatch Auto Detailing</h2>
        <p>We provide exceptional mobile detailing services with a focus on quality, convenience, and customer satisfaction.</p>
        <p>From interior deep cleaning to exterior polishing and ceramic coatings, we handle every detail with precision and care.</p>
      </section>

      {/* Our Commitment */}
      <section className="section">
        <h2>Our Commitment</h2>
        <p>We treat every car with the same precision and respect, whether it's luxury, daily commuter, or off-road machine.</p>
        <p>We use eco-friendly solutions whenever possible to protect your vehicle and the environment.</p>
      </section>

      {/* Services Grid */}
      <section className="section">
        <h2>Our Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card ${expandedService === index ? "expanded" : ""}`}
              onClick={() => setExpandedService(expandedService === index ? null : index)}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              {expandedService === index && <p className="extra-info">Additional info, pricing, or package options here.</p>}
              <button
                className="book-now-btn-small"
                onClick={() => handleServiceClick(service.title)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="section" id="contact-form">
        <h2>Book Your Detailing</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          <textarea name="message" placeholder="Message or Special Requests" rows="5" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>

          {/* Hidden field for selected service */}
          <input type="hidden" name="service" value={formData.service} />

          <button type="submit">Submit</button>
          {submitted && <div className="popup">Thanks! We’ll be in touch soon.</div>}
        </form>
      </section>
    </>
  );
}

export default Home;
