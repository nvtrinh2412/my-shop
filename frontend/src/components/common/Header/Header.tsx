import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import './Header.scss';
function Header() {

  return (
    <>
      <div className="header">
        <div className="navigation">
          <div className="navigation__logo">
            <img
              className="navigation__logo--img logo__icon"
              src="https://image.shutterstock.com/image-vector/triangle-icon-vector-on-white-260nw-1714935088.jpg"
              alt="Vercel Logo"
            />
          </div>
          <div className="navigation__links">
            <NavLink className="navigation__links-item"  end to ="/search">
              All
            </NavLink>
            <NavLink className="navigation__links-item" end to="/search/clothes">
              New Arrival
            </NavLink>
            <NavLink className="navigation__links-item" end to="/search/featured">
              Featured
            </NavLink>
          </div>
        </div>

        <div className="search">
          <div className="search__container">
            <input className="search__input" type="text" placeholder="Search for products..." />
            <FaSearch className="search__icon" />
          </div>
        </div>

        <div className="checkout">
          <div className="checkout__container">
            <FiShoppingBag className="checkout__icon" />
            <div className="checkout__avatar">
              <img
                className="checkout__avatar--img"
                src="https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Vercel Logo"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
