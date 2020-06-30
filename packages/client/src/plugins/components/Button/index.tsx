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

export const Button = ({ isFull, href, text, bgcolor, style: commonStyle }) => {
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
          ...transformStyle(commonStyle)
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
  style: {
    margin: marginCss,
    padding: paddingCss,
    font: fontCss
  }
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
