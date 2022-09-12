import React, { useState, ReactElement } from 'react';
import slugify from 'slugify';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateCategory, updateUrl, updateDesigner, updateSort } from './filterSlice';
import './Criteria.scss';

interface CriteriaProps {
  title: string;
  criteria: string[];
  type: string;
}
const Criteria: React.FC<CriteriaProps> = (props: CriteriaProps): ReactElement => {
  const { type, title, criteria } = props;
  const [selected, setSelected] = useState(-1);
  const dispatch = useDispatch();
  const SORT_KEY = ['name', 'createdAt', 'price'];
  const SORT_ORDER = ['ASC', 'DESC'];
  const sortList = [
    {
      key: SORT_KEY[0],
      order: SORT_ORDER[0],
    },
    {
      key: SORT_KEY[1],
      order: SORT_ORDER[1],
    },
    {
      key: SORT_KEY[2],
      order: SORT_ORDER[0],
    },
    {
      key: SORT_KEY[2],
      order: SORT_ORDER[1],
    },
  ];
  const handleClick = (idx: number): void => {
    const clickedItem = criteria[idx];
    setSelected(idx);
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
          {criteria.map((criterion: string, idx: number): ReactElement => {
            const filterUrl = `/search/${slugify(criterion, { lower: true, trim: true })}`;
            const itemClassName = classNames('filter__criterion-link', {
              'filter__criterion-link--active': selected === idx,
            });
            return (
              <Link to={filterUrl} className={itemClassName} onClick={() => handleClick(idx)}>
                <p className="filter__criterion">{criterion}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Criteria;
