import React, { useState } from 'react';
import classNames from 'classnames';
import { AiOutlineCheck } from 'react-icons/ai';
import './Selection.scss';

interface IProps {
  type: string;
  title: string;
  option: string[];
}
const Selection: React.FC<IProps> = (props: IProps) => {
  const { type, title, option } = props;
  const [selectedIdx, setSelectedIdx] = useState(0);
  const handleClick = (idx: number) => {
    setSelectedIdx(idx);
  };
  return (
    <div className="selection">
      <h2>{title}</h2>
      <div className="selection__list">
        {option.map((item: string, idx: number) => {
          const isColor = type === 'color';
          const isSelected = idx === selectedIdx;
          const itemClassName = classNames(
            'selection__item',
            { 'selection__item--active': isSelected },
            {
              [`selection-color--${item}`]: isColor,
            }
          );
          return (
            <div className={itemClassName} key={item} onClick={() => handleClick(idx)} aria-hidden="true">
              {isColor && isSelected && <AiOutlineCheck className="selected-item" />}
              {!isColor && item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Selection;
