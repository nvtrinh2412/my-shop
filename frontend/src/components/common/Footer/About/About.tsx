import React from 'react';
import { Link } from 'react-router-dom';
import { BsGithub } from 'react-icons/bs';
import './About.scss';

const About: React.FC = () => {
  return (
    <div className="about">
      <div className="about__container">
        <div className="about__brand">
          <img
            className="about__brand--img"
            src="/images/vercel-icon.jpg"
            alt="Vercel Logo"
          />
          <span className="about__brand--name">ACME</span>
        </div>

        <div className="about__information">
          <div className="about__information-shopping">
            <Link className="about__information-item" to="/home">
              Home
            </Link>
            <Link className="about__information-item" to="/about">
              About
            </Link>
            <Link className="about__information-item" to="/term-of-use">
              Terms of use
            </Link>
            <Link className="about__information-item" to="/shipping">
              Shipping
            </Link>
          </div>
          <div className="about__information-policy">
            <Link className="about__information-item" to="/privacy-policy">
              Privacy Policy
            </Link>
          </div>
          <div />
        </div>

        <div className="about__more">
          <BsGithub className="about__more-icon" />
          <div className="about__more-language">
            <img
              className="about__more-language-icon"
              src="/images/america-flag.png"
              alt="US-UK"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
