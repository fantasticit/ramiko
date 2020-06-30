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

export const BaseTitle = ({ title, style }) => {
  return (
    <div className={style.wrapper} style={transformStyle(style)}>
      {title}
    </div>
  );
};

BaseTitle.defaultProps = {
  title: '标题',
  color: '#333',
  bgcolor: 'transparent',
  style: {
    margin: marginCss,
    padding: paddingCss,
    font: fontCss
  }
};

(BaseTitle as any).schema = {
  title: {
    title: '标题',
    type: 'text'
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
