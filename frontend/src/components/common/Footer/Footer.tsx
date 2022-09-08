import React from 'react';
import About from './About/About';
import Copyrights from './Copyrights/Copyrights';
import './Footer.scss';

function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__item">
          <About />
          <Copyrights />
        </div>
      </div>
    </div>
  );
}
export default Footer;
