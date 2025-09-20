import React from "react";
import '../App.css';


export const FooterComponent = () => {
  return (
    <footer
      className="bg-dark text-light py-3"
    >
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        {/* Left - App Info */}
        <span>
          © {new Date().getFullYear()} Book Club Library. All rights reserved.
        </span>

        {/* Center - Links */}
        <div className="my-2 my-md-0">
          <a href="/" className="text-light text-decoration-none mx-2">
            Home
          </a>
          <a href="/about" className="text-light text-decoration-none mx-2">
            About
          </a>
          <a href="/contact" className="text-light text-decoration-none mx-2">
            Contact
          </a>
          <a href="/privacy" className="text-light text-decoration-none mx-2">
            Privacy
          </a>
        </div>

        {/* Right - Socials */}
        <div>
          <a
            href="https://www.linkedin.com/company/altres-technologies-india/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light mx-2"
          >
            <i className="bi bi-linkedin"></i>
          </a>
          <a
            href="https://www.instagram.com/altres.technologies"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light mx-2"
          >
            <i className="bi bi-instagram"></i>
          </a>
          <a
            href="https://www.altres.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light mx-2"
          >
            <i className="bi bi-globe"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};
