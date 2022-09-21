import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiFillStar } from 'react-icons/ai';
import classNames from 'classnames';
import renderProductPrice from '@assets/helper/products';
import { addToCart } from '@components/common/Cart/cartSlice';
import useProductDetail from '@hooks/useProductDetail';
import { DEFAULT_PRODUCT } from '@pages/Home/ProductList/Product/Product';
import Selection from './Selection/Selection';
import './ProductDetail.scss';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const productName = useParams().name || '';
  const { product = DEFAULT_PRODUCT } = useProductDetail(productName);
  const { id, name, price, imageUrl, description, color, size } = product;
  const formattedPrice = renderProductPrice(price);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const handleClick = (idx: number) => {
    setSelectedImage(idx);
  };
  const handleAddToCart = (): void => {
    const selectedItem = {
      id,
      name,
      price,
      imageUrl: imageUrl[selectedImage],
      color: color?.at(selectedColor) || '',
      size: size?.at(selectedSize) || '',
      quantity: 1,
    };
    dispatch(addToCart(selectedItem));
  };
  return (
    <>
      <div className="product-detail">
        <div className="product-detail__container">
          <div className="product-detail__image-container">
            <div className="product-detail__image--main">
              <div className="product-detail__image-tag">
                <div className="product-detail__image-tag-name">{name}</div>
                <div className="product-detail__image-tag-price">{formattedPrice}</div>
              </div>
              <img className="product-detail__img" src={imageUrl?.at(selectedImage)} alt="" />
            </div>

            <div className="product-detail__image--sub">
              {imageUrl?.map((item: string, idx: number) => {
                const selectedIdx = idx === selectedImage;
                const itemClassName = classNames('product-detail__image--sub-item', {
                  'product-detail__image--sub-item--active': selectedIdx,
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
            <Selection type="size" option={size} selectedIdx={selectedSize} setSelectedIdx={setSelectedSize} />
            <Selection type="color" option={color} selectedIdx={selectedColor} setSelectedIdx={setSelectedColor} />

            <p className="product-detail__info-description">{description}</p>
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

            <button className="add-to-cart__btn" type="button" onClick={() => handleAddToCart()}>
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
