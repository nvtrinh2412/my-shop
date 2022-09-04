import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { FaSearch } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { updateName, updateUrl, resetAll } from '../../../pages/Home/components/Criteria/filterSlice';
import './Header.scss';

const Header: React.FC = () => {
  const navLinks = [
    {
      title: 'All',
      slug: '/search/all',
    },
    {
      title: 'New Arrival',
      slug: '/search/new-arrivals',
    },
    {
      title: 'Featured',
      slug: '/search/featured',
    },
  ];
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(updateName(search));
    dispatch(updateUrl());
  };
  const handleNavBar = (title: string) => {
    if (title === 'All') {
      dispatch(resetAll());
    }
  };
  return (
    <div className="header">
      <div className="header__container">
        <div className="header-navigation">
          <div className="header-navigation__logo">
            <img className="header-navigation__logo-img logo__icon" src="/images/vercel-icon.jpg" alt="Vercel Logo" />
          </div>
          <div className="header-navigation__links">
            {navLinks.map(({ title, slug }) => {
              return (
                <NavLink
                  className={({ isActive }) =>
                    classNames('header-navigation__links-item', {"header-navigation__links-item--active": isActive})
                  }
                  key={title}
                  to={slug}
                  onClick={() => handleNavBar(title)}
                >
                  {title}
                </NavLink>
              );
            })}
          </div>
        </div>

        <div className="header-search">
          <div className="header-search__container">
            <input
              className="header-search__input"
              type="text"
              placeholder="Search for products..."
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <FaSearch className="header-search__icon" onClick={() => handleSearch()} />
          </div>
        </div>

        <div className="header-checkout">
          <div className="header-checkout__container">
            <FiShoppingBag className="header-checkout__icon" />
            <div className="header-checkout__avatar">
              <img className="header-checkout__avatar-img" src="/images/gradient-avatar.jpg" alt="Vercel Logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
