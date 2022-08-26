import React from 'react';
import './Loading.scss';

function Loading() {
  const boxLoading = Array.from({ length: 9 });
  return (
    <>
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
    </>
  );
}

export default Loading;
