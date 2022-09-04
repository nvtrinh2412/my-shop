import React from 'react';
import slugify from 'slugify';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { updateCategory, updateUrl, updateDesigner, updateSort } from './filterSlice';
import './Criteria.scss';

interface IProps {
  title: string;
  criteria: string[];
  type: string;
}
const Criteria:React.FC<IProps> = (props: IProps) => {
  const { type, title, criteria } = props;
  const dispatch = useDispatch();
  const sortList = [
    {
      key: 'name',
      order: 'ASC',
    },
    {
      key: 'createdAt',
      order: 'DESC',
    },
    {
      key: 'price',
      order: 'ASC',
    },
    {
      key: 'price',
      order: 'DESC',
    },
  ];
  const handleClick = (idx: number) => {
    const clickedItem = criteria[idx];
    switch (type) {
      case 'categories':
        dispatch(updateCategory(clickedItem));
        break;
      case 'designers':
        dispatch(updateDesigner(clickedItem));
        break;
      case 'sort':
        dispatch(updateSort(sortList[idx]));
        break;
      default:
        break;
    }
    dispatch(updateUrl());
  };
  return (
    <div className="filter">
      <div className="filter__container">
        <h3 className="filter__title">{title}</h3>
        <div className="filter__criteria">
          {criteria.map((criterion: string, idx: number) => {
            const filterUrl = `/search/${slugify(criterion, { lower: true, trim: true })}`;
            return (
              <NavLink
                to={filterUrl}
                className={({ isActive }) =>
                  classNames('filter__criterion-link', { 'filter__criterion-link--active': isActive })
                }
                onClick={() => handleClick(idx)}
              >
                <p className="filter__criterion">{criterion}</p>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Criteria;
