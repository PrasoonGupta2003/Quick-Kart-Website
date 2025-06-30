import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaClock } from 'react-icons/fa';
import about1 from '../assets/about1.jpg';

function Contact() {
  return (
    <div className="w-full px-6 md:px-16 py-[100px] bg-[#f1f5f9] text-gray-800">

      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">We'd love to hear from you — feel free to reach out!</p>
      </div>

      {/* Image with Text */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-10 mb-20">
        <div className="md:w-1/2">
          <img src={about1} alt="Contact QuickKart" className="rounded-xl shadow-lg w-full" />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Let’s Talk</h2>
          <p className="text-gray-700 leading-relaxed">
            Whether you're looking for more information, want to give feedback, or just want to say hello — we're always open to conversation. QuickKart believes in clear, prompt communication and complete transparency.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            From product queries to partnership proposals, feel free to reach out using the form below or by connecting directly through our social handles.
          </p>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-blue-500 text-2xl" />
            <div>
              <h4 className="font-bold text-lg">Address</h4>
              <p className="text-sm text-gray-600">India (Operations are remote)</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-green-500 text-2xl" />
            <div>
              <h4 className="font-bold text-lg">Phone</h4>
              <p className="text-sm text-gray-600">Available upon request</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaEnvelope className="text-red-500 text-2xl" />
            <div>
              <h4 className="font-bold text-lg">Email</h4>
              <a href="mailto:prasoong82@gmail.com" className="text-sm text-blue-600 hover:underline">prasoong82@gmail.com</a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaClock className="text-yellow-500 text-2xl" />
            <div>
              <h4 className="font-bold text-lg">Working Hours</h4>
              <p className="text-sm text-gray-600">Mon - Sat: 9:00 AM to 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
          <form
            action="https://formsubmit.co/prasoong82@gmail.com"
            method="POST"
            className="flex flex-col gap-4"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://yourwebsite.com/thankyou" />

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="px-4 py-2 border rounded-md focus:outline-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="px-4 py-2 border rounded-md focus:outline-blue-500"
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              required
              className="px-4 py-2 border rounded-md focus:outline-blue-500"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Connect Section */}
      <div className="text-center mt-10">
        <h4 className="text-xl font-semibold mb-4">Connect with Me</h4>
        <div className="flex justify-center gap-6 text-2xl text-blue-600">
          <a href="https://www.linkedin.com/in/prashant-gupta-9825/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
            <FaLinkedin />
          </a>
          <a href="https://github.com/prashantgupta82" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800">
            <FaGithub />
          </a>
          <a href="mailto:prasoong82@gmail.com" className="hover:text-red-500">
            <FaEnvelope />
          </a>
        </div>
        <p className="text-sm text-gray-500 mt-4">Designed with care by Prasoon Gupta</p>
      </div>
    </div>
  );
}

export default Contact;
