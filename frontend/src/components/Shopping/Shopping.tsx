import React from "react";
import Criteria from "./Criteria/Criteria";
import ProductList from "./ProductList/ProductList";
import "./Shopping.scss";
function Shopping() {
  return (
    <>
      <div className="shopping">
        <div className="shopping__container">

          <div className="shopping__criteria--left">
            <Criteria />
            <Criteria />
          </div>

          <div className="shopping__products">
            <ProductList />
          </div>

          <div className="shopping__criteria--right">
            <Criteria />
          </div>
        </div>
      </div>
    </>
  );
}

export default Shopping;
