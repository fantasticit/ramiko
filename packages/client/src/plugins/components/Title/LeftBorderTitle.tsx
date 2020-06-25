import React from 'react';
import cls from 'classnames';
import { BaseTitle } from './BaseTitle';
import style from './index.module.scss';

export const LeftBorderTitle = ({
  title,
  color,
  bgcolor,
  align,
  borderColor
}) => {
  return (
    <div
      className={cls(style.wrapper, style.isLeftBorder)}
      style={{ textAlign: align, backgroundColor: bgcolor, color }}
    >
      <span style={{ backgroundColor: borderColor }}></span>
      <span>{title}</span>
    </div>
  );
};

LeftBorderTitle.defaultProps = {
  ...BaseTitle.defaultProps,
  borderColor: '#6260e1'
};

(LeftBorderTitle as any).schema = {
  ...(BaseTitle as any).schema,
  borderColor: {
    label: '背景色',
    type: 'color'
  }
};
