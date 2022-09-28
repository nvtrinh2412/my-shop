import React, { useState, useEffect, ReactElement, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { FaSearch } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import handleInputEvent from '@helpers/handleInputEvent';
import parseToSearchUrl from '@helpers/parseToSearchUrl';
import parseFilterURLParams from '@helpers/parseFilterURLParam';
import { updateName, updateUrl, updateAll, resetAll, updateCategory } from '@pages/Home/Criteria/filterSlice';
import rootState from '@models/rootState';
import Overlay from '@components/common/Overlay/Overlay';
import Cart from '@components/common/Cart/Cart';
import Login from '@components/common/Login/Login';
import TIME from '@constants/time';
import { ProductProps } from '@pages/Home/ProductList/Product/Product';
import axiosConfig from '@services/axiosConfig';
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
  const [openLogin, setOpenLogin] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [searchParams] = useSearchParams();
  const searchParamsObject = parseFilterURLParams(searchParams);
  const searchParamsString = parseToSearchUrl(searchParamsObject);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartList = useSelector((state: rootState) => state.cart.cartList);
  const isEmptyCart = cartList.length === 0;
  const typingTimeoutRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [hint, setHint] = useState<ProductProps[]>();
  const [visibleHint, setVisibleHint] = useState(false);
  const handleSearchTermChange = async (value: string) => {
    const url = `/products/filter?name=${value}`;
    await axiosConfig.get(url).then((res) => setHint(res.data));
    setVisibleHint(true);
  };
  const handleOnchangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length === 0) {
      setVisibleHint(false);
      setSearch('');
      return;
    }
    setSearch(value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      handleSearchTermChange(value);
    }, TIME.WAITING_TIME);
  };

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
    if (navLinks.find((item) => item.title === NAV_LINK.ALL)) {
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
              onChange={(e) => handleOnchangeInput(e)}
              onKeyUp={(e) => handleInputEvent(e, handleSearch)}
              onFocus={() => setVisibleHint(!visibleHint)}
            />
            <FaSearch className="header-search__icon" onClick={() => handleSearch()} />
          </div>

          <div className={classNames('header-search__dropdown', { 'header-search__dropdown--hidden': !visibleHint })}>
            {hint?.map((product) => {
              const { name, imageUrl } = product;
              const firstImage = imageUrl[0];
              return (
                <NavLink
                  className="header-search__dropdown-item"
                  to={`product/${name}`}
                  onClick={() => setVisibleHint(false)}
                >
                  <img className="header-search__dropdown-item-img" src={firstImage} alt="Vercel Logo" />
                  <div className="header-search__dropdown-item-name"> {name} </div>
                </NavLink>
              );
            })}
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
            <div className="header-checkout__avatar" onClick={() => setOpenLogin(!openLogin)} aria-hidden>
              <img className="header-checkout__avatar-img" src="/images/gradient-avatar.jpg" alt="Vercel Logo" />
            </div>
          </div>

          <div className={classNames('header__cart-detail', { 'header__cart-detail--hidden ': !openCart })}>
            <Cart />
          </div>
          <div className={classNames('header__login', { 'header__login--hidden ': !openLogin })}>
            <div className="header__login-container">
              <Login isOpen={openLogin} setOpen={setOpenLogin} />
            </div>
          </div>
        </div>
      </div>
      {(openCart || openLogin) && <Overlay />}
    </div>
  );
};

export default Header;
