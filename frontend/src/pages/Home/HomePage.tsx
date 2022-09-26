import React, { ReactElement, useEffect } from 'react';
import useProductLoad from '@hooks/useProductLoad';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import parseFilterURLParams from '@assets/helper/parseFilterURLParam';
import Criteria from './Criteria/Criteria';
import Loading from './ProductList/Loading/Loading';
import ProductList from './ProductList/ProductList';
import { updateAll, updateUrl } from './Criteria/filterSlice';
import './HomePage.scss';

const CRITERIA = {
  category: {
    type: 'category',
    title: 'All Categories',
    criteria: ['New Arrivals', 'Featured'],
  },
  designer: {
    type: 'designer',
    title: 'All Designers',
    criteria: ['ACME', 'Next.js'],
  },
  sort: {
    type: 'sort',
    title: 'Relevant',
    criteria: ['Trending', 'Latest arrivals', 'Price: Low to high', 'Price: High to low'],
  },
};
const HomePage = (): ReactElement => {
  const [searchParams] = useSearchParams();
  const searchParamsObject = parseFilterURLParams(searchParams);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateAll(searchParamsObject));
    dispatch(updateUrl());
  }, []);
  const { products, loading } = useProductLoad();
  return (
    <div className="home-page">
      <div className="shopping">
        <div className="shopping__container">
          <div className="shopping__criteria--left">
            <Criteria {...CRITERIA.category} />
            <Criteria {...CRITERIA.designer} />
          </div>
          <div className="shopping__products">
            <div className="shopping__result-container">
              {loading ? 'Loading ...' : `Showing ${products.length} results`}
            </div>
            {loading ? <Loading /> : <ProductList products={products} />}
          </div>
          <div className="shopping__criteria--right">
            <Criteria {...CRITERIA.sort} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
