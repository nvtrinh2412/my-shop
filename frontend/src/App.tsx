import React from 'react';
import './App.scss';
import Footer from './components/common/Footer/Footer';
import Header from './components/common/Header/Header';
import ProductDisplay from './pages/Home/HomePage';

function App() {
  return (
    <div className="App">
      <Header />
      <ProductDisplay />
      <Footer />
    </div>
  );
}

export default App;