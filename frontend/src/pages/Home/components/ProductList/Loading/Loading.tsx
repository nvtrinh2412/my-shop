import React from 'react';
import './Loading.scss';

function Loading() {
  const boxLoading = Array.from({ length: 12 });
  return (
    <>
      <div className="loading-list">
        <div className="loading-list__container">
          {boxLoading.map((box) => {
            return (
              <section>
                <div className="loading">
                  <div className="loading__container ">
                    <div className="loading_image loading-animation" />
                    <div className="loading__info"></div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Loading;
