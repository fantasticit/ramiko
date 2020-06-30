import React from 'react';
import {
  paddingCss,
  paddingCssSchema,
  marginCss,
  marginCssSchema,
  fontCss,
  fontCssSchema,
  transformStyle
} from '@/views/editor';
import style from './index.module.scss';

export const Footer = ({ text, bgcolor, style: commonStyle }) => {
  return (
    <div
      className={style.wrapper}
      style={{
        backgroundColor: bgcolor,
        ...transformStyle(commonStyle)
      }}
    >
      {text}
    </div>
  );
};

Footer.defaultProps = {
  text: '本页面由Ramiko提供',
  bgcolor: '#fff',
  style: {
    margin: marginCss,
    padding: paddingCss,
    font: fontCss
  }
};

(Footer as any).schema = {
  text: {
    title: '文字',
    type: 'text'
  },
  bgcolor: {
    title: '背景色',
    type: 'color'
  },
  style: {
    type: 'children',
    title: '基本样式',
    schema: {
      margin: marginCssSchema,
      padding: paddingCssSchema,
      font: fontCssSchema
    }
  }
};
