import React from 'react';
import cls from 'classnames';
import { transformStyle } from '@/views/editor';

import { BaseTitle } from './BaseTitle';
import style from './index.module.scss';

export const LeftBorderTitle = ({
  title,
  bgcolor,
  borderColor,
  style: commonStyle
}) => {
  return (
    <div
      className={cls(style.wrapper, style.isLeftBorder)}
      style={{ backgroundColor: bgcolor, ...transformStyle(commonStyle) }}
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
  title: (BaseTitle as any).schema.title,
  borderColor: {
    title: '背景色',
    type: 'color'
  },
  style: (BaseTitle as any).schema.style
};
