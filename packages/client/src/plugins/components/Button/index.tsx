import React from 'react';
import style from './index.module.scss';

export const Button = ({ isFull, href, text, bgcolor, align }) => {
  return (
    <div
      className={style.wrapper}
      style={{
        padding: isFull ? 0 : '0 8px'
      }}
    >
      <a
        href={href}
        style={{
          backgroundColor: bgcolor,
          textAlign: align
        }}
      >
        {text}
      </a>
    </div>
  );
};

Button.defaultProps = {
  isFull: false,
  href: '/',
  text: '文字',
  bgcolor: '#6260e1',
  align: 'center'
};

(Button as any).schema = {
  isFull: {
    title: '全宽展示',
    type: 'switch'
  },
  href: {
    title: '链接',
    type: 'text'
  },
  text: {
    title: '文字',
    type: 'text'
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
