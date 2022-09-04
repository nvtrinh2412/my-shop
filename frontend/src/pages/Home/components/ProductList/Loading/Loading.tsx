import React from 'react';
import './Loading.scss';

const Loading: React.FC = () => {
  const boxLoading = Array.from({ length: 12 });
  return (
    <div className="loading-list">
      <div className="loading-list__container">
        {boxLoading.map((box,idx) => {
          return (
            <section id={`box${idx}`}>
              <div className="loading">
                <div className="loading__container ">
                  <div className="loading_image loading-animation" />
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Loading;
