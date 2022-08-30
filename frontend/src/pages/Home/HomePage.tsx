import React,{ useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loading from './components/ProductList/Loading/Loading';
import { ProductProps } from './components/ProductList/Product/Product';
import { rootState } from '../../assets/interface/interface';
import Criteria from './components/Criteria/Criteria';
import ProductList from './components/ProductList/ProductList';
import './HomePage.scss';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [criteria, setCriteria] = useState<string[]>();
  const dataUrl = useSelector((state: rootState) => state.filter.url);
  useEffect(() => {
    setError(null);
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(dataUrl);
        setProducts(data);
      } catch (e:any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dataUrl]);

  return (
      <div className="shopping">
        <div className="shopping__container">
          <div className="shopping__criteria--left">
            <Criteria type="categories" title="All Categories" criteria={['New Arrivals', 'Featured']} />
            <Criteria type="designers" title="All Designers" criteria={['ACME', 'Next.js']} />
          </div>

          <div className="shopping__products">{loading ? <Loading /> : <ProductList products={products} />}</div>
          <div className="shopping__criteria--right">
            <Criteria
              type="sort"
              title="Relevant"
              criteria={['Trending', 'Latest arrivals', 'Price: Low to high', 'Price: High to low']}
            />
          </div>
        </div>
      </div>
  );
};

export default HomePage;
