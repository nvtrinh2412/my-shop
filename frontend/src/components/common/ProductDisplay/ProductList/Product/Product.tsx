import React from 'react';
import './Product.scss';

interface IProp {
  isLoading: boolean;
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

function Product(props: IProp) {
  const { isLoading, name, price, imageUrl } = props;
  console.log("loading: ", isLoading);
  return (
    <>
      <section>
        <div className="product">
          <div className="product__container ">
            <img className={`product__image ${isLoading ? 'loading' : ''}`} src={imageUrl} alt="product" />
            <div className="product__info">
              <div className="product__info-name">{name}</div>
              <p className="product__info-price">{price} $</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Product;
