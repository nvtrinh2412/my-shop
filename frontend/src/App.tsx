import React, { ReactElement } from 'react';
import Footer from './components/common/Footer/Footer';
import Header from './components/common/Header/Header';
import HomePage from './pages/Home/HomePage';
import './App.scss';
import ProductDetail from './pages/ProductDetail/ProductDetail';

const App: React.FC = (): ReactElement => {
  return (
    <div className="App">
      <Header />
      {/* <HomePage /> */}
      <ProductDetail/>
      <Footer />
    </div>
  );
};

export default App;
