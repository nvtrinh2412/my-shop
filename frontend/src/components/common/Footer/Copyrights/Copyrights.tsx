import React from "react";
import './Copyrights.scss'
function Copyrights() {
  return (
    <>
      <div className="copyrights">
        <div className="copyrights__container">
          <div className="copyrights__description">
            © 2020 ACME, Inc. All rights reserved
          </div>

          <div className="copyrights__owner">
            <p>Created by</p>
            <img className="copyrights__owner--image" src="https://image.pitchbook.com/hG77CP8UhJjUMH6f59hnUSo3p2V1608196200048_200x200" alt="Vercel" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Copyrights;
