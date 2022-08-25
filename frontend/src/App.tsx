import React from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Shopping from './components/Shopping/Shopping';
function App() {
  return (
    <div className="App">
    <Header/>
    <Shopping/>
    <Footer/>
    </div>
  );
}

export default App;
