import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import slugify from 'slugify';
import { updateCategory, updateUrl, setUrl, updateDesigner, updateSort } from './filterSlice';
import './Criteria.scss';
interface IProps {
  title: string;
  criteria: string[];
  type: string;
}
function Criteria(props: IProps): JSX.Element {
  const { type, title, criteria } = props;
  const [selectedIdx, setSelectedIdx] = useState<Number>(-1);
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
    <>
      <div className="filter">
        <div className="filter__container">
          <h3 className="filter__title">{title}</h3>
          <div className="filter__criteria">
            {criteria.map((criterion: string, idx: number) => {
              const filterUrl = `/${props.type}/${slugify(criterion, { lower: true, trim: true })}`;
              return (
                <NavLink to={filterUrl} className="removed_underline" key={idx} onClick={() => handleClick(idx)}>
                  <p className={`filter__criterion ${selectedIdx === idx ? 'active' : ''}`}>{criterion}</p>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Criteria;
