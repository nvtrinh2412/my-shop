import React, { useEffect, useState } from 'react';
import Product, { IProduct } from './Product/Product';
import './ProductList.scss';
interface IProps {
  products: IProduct[];
}
function ProductList(props: IProps): JSX.Element {
  const [products, setProducts] = useState<IProduct[]>(props.products);
  return (
    <>
      <div className="product-list">
        <div className="product-list__container">
          {products.map((product: IProduct) => {
            const { id, name, price, imageUrl } = product;
            return (
              <section className="product-list__item" key={product.id}>
                <Product id={id} name={name} price={price} imageUrl={imageUrl} />
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default ProductList;
