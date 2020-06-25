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
  bgcolor: '#fff',
  align: 'left'
};

(BaseTitle as any).schema = {
  title: {
    label: '标题',
    type: 'text'
  },
  color: {
    label: '文字颜色',
    type: 'color'
  },
  bgcolor: {
    label: '背景色',
    type: 'color'
  },
  align: {
    label: '对齐方式',
    type: 'radio',
    options: ['left', 'center', 'right']
  }
};
