import React from 'react';
import cls from 'classnames';
import {
  paddingCss,
  paddingCssSchema,
  marginCss,
  marginCssSchema,
  fontCss,
  fontCssSchema,
  transformStyle
} from 'views/editor';
import style from './index.module.scss';

export const Cover = ({ isFull = false, link, imgUrl, style: commonStyle }) => {
  return (
    <div
      className={cls({
        [style.wrapper]: true,
        [style.isFull]: isFull
      })}
      style={transformStyle(style)}
    >
      <a href={link}>
        <img src={imgUrl} alt={imgUrl} />
      </a>
    </div>
  );
};

Cover.defaultProps = {
  isFull: false,
  imgUrl:
    'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-06-27/dGUxUULyLhgGvkwoNsHn.png',
  link: '',
  style: {
    margin: marginCss,
    padding: paddingCss,
    font: fontCss
  }
};

(Cover as any).schema = {
  isFull: {
    title: '全宽展示',
    type: 'switch'
  },
  imgUrl: {
    title: '图片链接',
    type: 'img',
    width: 686,
    height: 180
  },
  link: {
    title: '跳转链接',
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
