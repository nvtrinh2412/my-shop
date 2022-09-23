import React, { useState, useEffect, ReactElement } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import parseFilterURLParams from '@assets/helper/parseFilterURLParam';
import parseToSearchUrl from '@assets/helper/parseToSearchUrl';
import { updateUrl, updateAll } from './filterSlice';
import './Criteria.scss';

interface CriteriaProps {
  title: string;
  criteria: string[];
  type: string;
}
const SORT_KEY = ['name', 'createdAt', 'price', 'sellQuantity'];
const SORT_ORDER = ['ASC', 'DESC'];
const sortList = [
  {
    key: SORT_KEY[3],
    order: SORT_ORDER[1],
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
const Criteria: React.FC<CriteriaProps> = (props: CriteriaProps): ReactElement => {
  const { type, title, criteria } = props;
  const [selected, setSelected] = useState(-1);
  const [searchParams] = useSearchParams();
  const searchParamsObject = parseFilterURLParams(searchParams);
  const dispatch = useDispatch();
  const handleClick = (idx: number): void => {
    setSelected(idx);
  };
  useEffect(() => {
    let idx;
    if (type === 'sort') {
      const { key, order } = searchParamsObject;
      idx = sortList.findIndex((item) => item.key === key && item.order === order);
    } else {
      idx = criteria.findIndex((item) => item === searchParamsObject[type as keyof typeof searchParamsObject]);
    }
    setSelected(idx);
    dispatch(updateAll(searchParamsObject));
    dispatch(updateUrl());
  }, [searchParams]);

  return (
    <div className="filter">
      <div className="filter__container">
        <h3 className="filter__title">{title}</h3>
        <div className="filter__criteria">
          {criteria.map((criterion: string, idx: number): ReactElement => {
            let targetLink;
            if (type === 'sort') {
              targetLink = parseToSearchUrl({ ...searchParamsObject, ...sortList[idx] });
            } else {
              targetLink = parseToSearchUrl({ ...searchParamsObject, [type]: criterion });
            }
            const itemClassName = classNames('filter__criterion-link', {
              'filter__criterion-link--active': selected === idx,
            });
            return (
              <Link
                to={`/search/filter?${targetLink}`}
                className={itemClassName}
                onClick={() => handleClick(idx)}
                aria-hidden
              >
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
