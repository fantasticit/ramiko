import React from 'react';
import style from './index.module.scss';

export const BaseTitle = ({ title, color, bgcolor, align }) => {
  return (
    <div
      className={style.wrapper}
      style={{ textAlign: align, backgroundColor: bgcolor, color }}
    >
      {title}
    </div>
  );
};

BaseTitle.defaultProps = {
  title: '标题',
  color: '#333',
  bgcolor: 'transparent',
  align: 'left'
};

(BaseTitle as any).schema = {
  title: {
    title: '标题',
    type: 'text'
  },
  color: {
    title: '文字颜色',
    type: 'color'
  },
  bgcolor: {
    title: '背景色',
    type: 'color'
  },
  align: {
    title: '对齐方式',
    type: 'radio',
    options: ['left', 'center', 'right']
  }
};
