import React, { useState } from 'react';
import Product, { ProductProps } from './Product/Product';
import './ProductList.scss';

interface IProps {
  products: ProductProps[];
}
const ProductList:React.FC<IProps> = (props: IProps) =>{
  const [products, setProducts] = useState<ProductProps[]>(props.products);
  return (
      <div className="product-list">
        <div className="product-list__container">
          {products.map((product: ProductProps) => {
            const { id, name, price, imageUrl } = product;
            return (
              <section className="product-list__item" key={product.id}>
                <Product id={id} name={name} price={price} imageUrl={imageUrl} />
              </section>
            );
          })}
        </div>
      </div>
  );
}
export default ProductList;
