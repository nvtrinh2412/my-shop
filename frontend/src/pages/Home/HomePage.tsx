import React, { ReactElement } from 'react';
import useProductLoad from '../../hooks/useProductLoad';
import Criteria from './components/Criteria/Criteria';
import Loading from './components/ProductList/Loading/Loading';
import ProductList from './components/ProductList/ProductList';
import './HomePage.scss';

const HomePage: React.FC = (): ReactElement => {
  const CRITERIA = {
    category: {
      type: 'categories',
      title: 'All Categories',
      criteria: ['New Arrivals', 'Featured'],
    },
    designer: {
      type: 'designers',
      title: 'All Designers',
      criteria: ['ACME', 'Next.js'],
    },
    sort: {
      type: 'sort',
      title: 'Relevant',
      criteria: ['Trending', 'Latest arrivals', 'Price: Low to high', 'Price: High to low'],
    },
  };
  const { products, loading, error } = useProductLoad();
  return (
    <div className="home-page">
      <div className="shopping">
        <div className="shopping__container">
          <div className="shopping__criteria--left">
            <Criteria {...CRITERIA.category} />
            <Criteria {...CRITERIA.designer} />
          </div>
          <div className="shopping__products">
            <div className="result__container">{loading ? 'Loading ...' : `Showing ${products.length} results`}</div>
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
