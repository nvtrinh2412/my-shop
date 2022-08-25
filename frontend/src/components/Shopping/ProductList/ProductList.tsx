import React from 'react'
import Product from './Product/Product'
import './ProductList.scss'
function ProductList() {
  return (
    <>
       <div className="product-list">
          <div className="product-list__container">
             <section className='product-list__item'>
                <Product/>
             </section>

             <section className='product-list__item'>
                <Product/>
             </section>

             <section className='product-list__item'>
                <Product/>
             </section>

             <section className='product-list__item'>
                <Product/>
             </section>

             <section className='product-list__item'>
                <Product/>
             </section>

             <section className='product-list__item'>
                <Product/>
             </section>

             <section className='product-list__item'>
                <Product/>
             </section>

          </div>
       </div>
    </>
  )
}

export default ProductList