import React from 'react';
import classNames from 'classnames';
import { AiOutlineCheck } from 'react-icons/ai';
import './Selection.scss';

interface IProps {
  type: string;
  option: string[];
  selectedIdx: number;
  setSelectedIdx: React.Dispatch<React.SetStateAction<number>>;
}
const Selection: React.FC<IProps> = (props: IProps) => {
  const { type, option, selectedIdx, setSelectedIdx } = props;
  const handleClick = (idx: number) => {
    setSelectedIdx(idx);
  };
  return (
    <div className="selection">
      <h3>{type.toUpperCase()}</h3>
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
              {isColor && isSelected && <AiOutlineCheck className={`selection__selected-item--${item}`} />}
              {!isColor && item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Selection;
