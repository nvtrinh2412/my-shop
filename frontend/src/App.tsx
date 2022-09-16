import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/common/Footer/Footer';
import Header from './components/common/Header/Header';
import HomePage from './pages/Home/HomePage';
import './App.scss';
import ProductDetail from './pages/ProductDetail/ProductDetail';

const App = (): ReactElement => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="search" element={<HomePage />}>
            <Route path="filter" element={<HomePage />} />
            <Route path="*" element={<HomePage />} />
          </Route>
          <Route path="product/:name" element={<ProductDetail />} />
          <Route path="*" element={<Navigate to="/search/" replace />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
