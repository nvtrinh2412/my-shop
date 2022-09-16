import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { BsGithub } from 'react-icons/bs';
import './About.scss';
import slugify from 'slugify';

const shoppingInfo = ['Home', 'About', 'Terms of use', 'Shipping'];
const About = (): ReactElement => {
  return (
    <div className="about">
      <div className="about__container">
        <div className="about__brand">
          <img className="about__brand--img" src="/images/vercel-icon.jpg" alt="Vercel Logo" />
          <span className="about__brand--name">ACME</span>
        </div>

        <div className="about__information">
          <div className="about__information-shopping">
            {shoppingInfo.map((info: string): ReactElement => {
              const slug = slugify(info, { lower: true });
              return (
                <Link className="about__information-item" key={info} to={`/${slug}`}>
                  {info}
                </Link>
              );
            })}
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
            <img className="about__more-language-icon" src="/images/america-flag.png" alt="US-UK" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
