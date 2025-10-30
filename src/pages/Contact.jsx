import React, { useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    emailjs.send(
      "service_5lw96mm",    // ✅ your EmailJS service ID
      "template_getgj87",   // ✅ your EmailJS template ID
      
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      },
      "FWAd3Z-6YUT3c-NhW"
    )
    .then(() => {
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    })
    .catch((error) => {
      console.error("Email failed:", error);
      alert("Message failed to send. Try again.");
    });
  }

  return (
    <div className="page-container">
      <h1>Contact Us</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-primary">Send</button>
        {submitted && <p className="success">Message sent successfully!</p>}
      </form>
    </div>
  );
};

export default Contact;
