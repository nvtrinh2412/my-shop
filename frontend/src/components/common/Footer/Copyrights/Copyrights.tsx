import React, { ReactElement } from 'react';
import './Copyrights.scss';

const Copyrights: React.FC = (): ReactElement => {
  return (
    <div className="copyrights">
      <div className="copyrights__container">
        <div className="copyrights__description">© 2020 ACME, Inc. All rights reserved</div>

        <div className="copyrights__owner">
          <p>Created by</p>
          <img className="copyrights__owner-image" src="/images/vercel-brand.png" alt="Vercel" />
        </div>
      </div>
    </div>
  );
};

export default Copyrights;
