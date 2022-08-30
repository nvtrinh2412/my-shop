import React from 'react';
import './Product.scss';

export interface ProductProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const  Product = (props: ProductProps) =>  {
  const { name, price, imageUrl } = props;
  return (
      <section>
        <div className="product">
          <div className="product__container ">
            <img className="product__image" src={imageUrl} alt="product" />
            <div className="product__info">
              <div className="product__info-name">{name}</div>
              <p className="product__info-price">{price} $</p>
            </div>
          </div>
        </div>
      </section>
  );
}

export default Product;
