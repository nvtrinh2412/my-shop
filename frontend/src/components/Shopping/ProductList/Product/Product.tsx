import React from "react";
import "./Product.scss";
function Product() {
  return (
    <>
      <section>
        <div className="product">
          <div className="product__container">
              <img  className="product__image" src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FSticker-mock.png%3Fv%3D1623256356&w=1920&q=85" alt="product" />
            <div className="product__info">
              <div className="product__info--name">Quarter Zip</div>
              <p className="product__info--price">255$</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Product;
