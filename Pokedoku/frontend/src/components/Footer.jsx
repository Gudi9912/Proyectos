import React from 'react'
import './Footer.css'
import githubLogo from './images/github.png' 
import linkedinLogo from './images/linkedin.png'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Pokedoku. Gudiño Gonzalo.
        </p>

        {/* Contenedor de logos */}
        <div className="logo-container">
          {/* Logos */}
          <a
            href="https://www.linkedin.com/in/gonzalo-gudi%C3%B1o/" 
            target="_blank"
            rel="noopener noreferrer"
            className="logo-link"
          >
            <img
              src={linkedinLogo}
              alt="LinkedIn"
              className="logo"
            />
          </a>
          <a
            href="https://github.com/Gudi9912" 
            target="_blank"
            rel="noopener noreferrer"
            className="logo-link"
          >
            <img
              src={githubLogo}
              alt="GitHub"
              className="logo"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;