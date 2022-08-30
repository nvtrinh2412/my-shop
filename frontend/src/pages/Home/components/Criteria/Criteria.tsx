import React, { useState } from 'react';
import slugify from 'slugify';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { updateCategory, updateUrl, updateDesigner, updateSort } from './filterSlice';
import './Criteria.scss';

interface IProps {
  title: string;
  criteria: string[];
  type: string;
}
const Criteria = (props: IProps) => {
  const { type, title, criteria } = props;
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const dispatch = useDispatch();
  const sortList = [
    {
      key: 'trending',
      order: 'desc',
    },
    {
      key: 'createdAt',
      order: 'desc',
    },
    {
      key: 'price',
      order: 'asc',
    },
    {
      key: 'price',
      order: 'desc',
    },
  ];
  const handleClick = (idx: number) => {
    setSelectedIdx(idx);
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
            const filterUrl = `/${type}/${slugify(criterion, { lower: true, trim: true })}`;
            const isSelected = selectedIdx === idx ? "--active" : "";
            // const criterionClassName = classNames('filter__criterion', {active: selectedIdx === idx })
            const criterionClassName = classNames({ [`filter__criterion${isSelected}`]: true });
            return (
              <Link to={filterUrl} className="removed_underline" onClick={() => handleClick(idx)}>
                <p className={criterionClassName}>{criterion}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Criteria;
