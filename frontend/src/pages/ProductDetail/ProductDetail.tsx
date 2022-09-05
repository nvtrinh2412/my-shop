import React, { useState } from 'react';
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import classNames from 'classnames';
import Selection from './Selection/Selection';
import './ProductDetail.scss';

const ProductDetail: React.FC = () => {
  const imageUrl = [
    'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FFront-NoModel_ec3be051-d579-4c03-b55b-64449d0b0445.png%3Fv%3D1623255893&w=1200&q=85',
    'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FFrontZoom_6302485d-7f7f-4585-b27b-aea85b7d644a.png%3Fv%3D1623255894&w=1200&q=85',
    'https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FFront_c81c04e9-333a-4a6c-b91a-e898f2a6025b.png%3Fv%3D1623255894&w=1200&q=85',
  ];
  const [selectedImage, setSelectedImage] = useState(0);
  const handleClick = (idx: number) => {
    setSelectedImage(idx);
  };
  return (
    <>
      <div className="product-detail">
        <div className="product-detail__container">
          <div className="product-detail__image-container">
            <div className="product-detail__image--main">
              <div className="product-detail__image-tag">
                <div className="product-detail__image-tag-name">Special Edition T-Shirt</div>
                <div className="product-detail__image-tag-price">50.00 $</div>
              </div>
              <img className="product-detail__img" src={imageUrl[selectedImage]} alt="" />
            </div>

            <div className="product-detail__image--sub">
              {imageUrl.map((item, idx) => {
                const isSelected = idx === selectedImage;
                const itemClassName = classNames('product-detail__image--sub-item', {
                  'product-detail__image--sub-item--active': isSelected,
                });
                return (
                  <div className={itemClassName} onClick={() => handleClick(idx)} aria-hidden="true">
                    <img src={item} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="product-detail__info">
            <Selection type="size" title="Size" option={['S', 'M', 'L', 'XL']} />
            <Selection type="color" title="Color" option={['black', 'gray', 'blue', 'orange']} />

            <p className="product-detail__info-description">
              Show off your love for Next.js and Vercel with this unique, limited edition t-shirt. This design is part
              of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle
              design. Get it while supplies last – only 200 of these shirts will be made! All proceeds will be donated
              to charity.
            </p>
            <div className="product-detail__info-rate">
              <span className="product-detail__info-rate-star">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </span>
              <p className="product-detail__info-rate-count">36 reviews</p>
            </div>

            <button className="add-to-cart__btn" type="button">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      <div className="related-product">
        <div className="related-product__container">
          <h2 className="related-product__title">Related Products</h2>
          <div className="related-product__image">
            <div className="related-product__image-container">
              <div className="related-product__image-item">
                <img
                  src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FQZSide-Model.png%3Fv%3D1623256247&w=2048&q=85"
                  alt=""
                />
              </div>
              <div className="related-product__image-item">
                <img
                  src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0434%2F0285%2F4564%2Fproducts%2FSticker-mock.png%3Fv%3D1623256356&w=2048&q=85"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
