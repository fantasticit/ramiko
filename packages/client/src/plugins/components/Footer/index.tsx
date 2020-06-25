import React from 'react';
import style from './index.module.scss';

export const Footer = ({ text, bgcolor, align }) => {
  return (
    <div
      className={style.wrapper}
      style={{
        backgroundColor: bgcolor,
        textAlign: align
      }}
    >
      {text}
    </div>
  );
};

Footer.defaultProps = {
  text: '本页面由Ramiko提供',
  bgcolor: '#f8f8f8',
  align: 'center'
};

(Footer as any).schema = {
  text: {
    label: '文字',
    type: 'text'
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
