import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import './Header.scss';

function Header() {
  const navLinks = [
    {
      title: 'All',
      slug: '/search',
    },
    {
      title: 'New Arrival',
      slug: '/search/clothes',
    },
    {
      title: 'Featured',
      slug: '/search/featured',
    },
  ];
  return (
    <div className="header">
      <div className="navigation">
        <div className="navigation__logo">
          <img className="navigation__logo-img logo__icon" src="/images/vercel-icon.jpg" alt="Vercel Logo" />
        </div>
        <div className="navigation__links">
          {navLinks.map(({ title, slug }) => (
            <NavLink className="navigation__links-item" key={title} end to={slug}>
              {title}
            </NavLink>
          ))}
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
            <img className="checkout__avatar--img" src="/images/gradient-avatar.jpg" alt="Vercel Logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
