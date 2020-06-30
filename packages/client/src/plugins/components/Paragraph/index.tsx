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

export const Paragraph = ({ items = [], style: commonStyle }) => {
  return (
    <div className={style.wrapper} style={transformStyle(commonStyle)}>
      <div className={style.content}>
        {items.map((item, index) => {
          return <p key={index}>{item.content}</p>;
        })}
      </div>
    </div>
  );
};

Paragraph.defaultProps = {
  items: [
    { content: '1. 开发编辑器插件（组件）' },
    { content: '2. 注册插件（组件）' },
    { content: '3. 搭建中使用插件（组件）' }
  ],
  style: {
    margin: marginCss,
    padding: paddingCss,
    font: fontCss
  }
};

(Paragraph as any).schema = {
  items: {
    type: 'children',
    min: 1,
    title: '文本',
    schema: {
      content: {
        title: '文字',
        type: 'textarea'
      }
    }
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
