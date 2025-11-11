import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="content">
      <section className="section">
        <h2>Contact Us</h2>
        <p>
          Have a question or want to book a detailing appointment? 
          Fill out the form below and we’ll get back to you as soon as possible.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>

        {submitted && <p>Thanks for reaching out! We’ll get back to you soon.</p>}
      </section>

      <section className="section">
        <h2>Business Hours</h2>
        <p>Monday - Saturday: 8:00 AM - 6:00 PM</p>
        <p>Sunday: Closed</p>
      </section>

      <section className="section">
        <h2>Location</h2>
        <p>Serving Ogden, Roy, Layton, and surrounding areas.</p>
      </section>
    </div>
  );
}

export default Contact;
