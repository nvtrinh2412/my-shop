import React, { useState, useEffect, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { FaSearch } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import handleInputEvent from '@helpers/handleInputEvent';
import parseToSearchUrl from '@helpers/parseToSearchUrl';
import parseFilterURLParams from '@helpers/parseFilterURLParam';
import { updateName, updateUrl, updateAll, resetAll, updateCategory } from '@pages/Home/Criteria/filterSlice';
import rootState from '@models/rootState';
import Cart from '../Cart/Cart';
import './Header.scss';

const navLinks = [
  {
    title: 'All',
    slug: '/search/',
  },
  {
    title: 'New Arrivals',
    slug: '/search/filter?category=New+Arrivals',
  },
  {
    title: 'Featured',
    slug: '/search/filter?category=Featured',
  },
];
const NAV_LINK = {
  ALL: 'All',
  NEW_ARRIVALS: 'New Arrivals',
  FEATURED: 'Featured',
};
const Header = (): ReactElement => {
  const [search, setSearch] = useState('');
  const [openCart, setOpenCart] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [searchParams] = useSearchParams();
  const searchParamsObject = parseFilterURLParams(searchParams);
  const searchParamsString = parseToSearchUrl(searchParamsObject);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartList = useSelector((state: rootState) => state.cart.cartList);
  const isEmptyCart = cartList.length === 0;
  useEffect(() => {
    const idx = navLinks.findIndex((item) => item.slug.includes(searchParamsString));
    setSelected(idx);
    dispatch(updateAll(searchParamsObject));
    dispatch(updateUrl());
  }, [searchParams]);
  const handleSearch = (): void => {
    dispatch(updateName(search));
    dispatch(updateUrl());
  };

  const handleNavBar = (title: string, idx: number): void => {
    navigate(navLinks[idx].slug);
    if (title === navLinks.filter((item) => item.title === NAV_LINK.ALL)[0].title) {
      dispatch(resetAll());
    } else {
      setSelected(idx);
      dispatch(updateCategory(title));
      dispatch(updateUrl());
    }
  };
  return (
    <div className="header ">
      <div className="header__container">
        <div className="header-navigation">
          <div className="header-navigation__logo">
            <img className="header-navigation__logo-img logo__icon" src="/images/vercel-icon.jpg" alt="Vercel Logo" />
          </div>
          <div className="header-navigation__links">
            {navLinks.map(({ title, slug }, idx): ReactElement => {
              return (
                <Link
                  className={classNames('header-navigation__links-item', {
                    'header-navigation__links-item--active': selected === idx,
                  })}
                  key={title}
                  to={slug}
                  onClick={() => handleNavBar(title, idx)}
                >
                  {title}
                </Link>
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
              onKeyUp={(e) => handleInputEvent(e, handleSearch)}
            />
            <FaSearch className="header-search__icon" onClick={() => handleSearch()} />
          </div>
        </div>

        <div className="header-checkout">
          <div className="header-checkout__close ">
            <div
              className={classNames('header-checkout__close-tag', { 'header-checkout__close-tag--hidden': !openCart })}
            >
              <span className="header-checkout__close-tag-icon" onClick={() => setOpenCart(!openCart)} aria-hidden>
                Close
              </span>
            </div>
          </div>
          <div className="header-checkout__container ">
            <div className="header-checkout__cart-container">
              <FiShoppingBag
                className={classNames('header-checkout__cart-icon', { 'header-checkout__cart-icon--active': openCart })}
                onClick={() => setOpenCart(!openCart)}
              />
              {!isEmptyCart && <p className="header-checkout__cart-amount">{cartList.length}</p>}
            </div>
            <div className="header-checkout__avatar">
              <img className="header-checkout__avatar-img" src="/images/gradient-avatar.jpg" alt="Vercel Logo" />
            </div>
          </div>

          <div className={classNames('header__cart-detail', { 'header__cart-detail--hidden ': !openCart })}>
            <Cart />
          </div>
        </div>
      </div>
      <div className={classNames({ overlay: openCart })}> </div>
    </div>
  );
};

export default Header;
