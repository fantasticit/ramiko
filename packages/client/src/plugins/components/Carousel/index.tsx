import React from 'react';
import { Carousel as ACarousel } from 'antd';
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

export const Carousel = ({
  autoplay,
  dotPosition,
  carousels = [],
  style: commonStyle
}) => {
  return (
    <div className={style.wrapper} style={transformStyle(commonStyle)}>
      <ACarousel autoplay={autoplay} dotPosition={dotPosition}>
        {carousels.map((carousel, index) => {
          return (
            <img
              key={index}
              src={carousel.url}
              onClick={() => window.open(carousel.link)}
            />
          );
        })}
      </ACarousel>
    </div>
  );
};

Carousel.defaultProps = {
  autoplay: false,
  dotPosition: 'bottom',
  carousels: [
    {
      url:
        'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-06-27/dGUxUULyLhgGvkwoNsHn.png',
      link: 'http://www.baidu.com'
    },
    {
      url:
        'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-06-27/dGUxUULyLhgGvkwoNsHn.png',
      link: 'http://www.baidu.com'
    },
    {
      url:
        'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-06-27/dGUxUULyLhgGvkwoNsHn.png',
      link: 'http://www.baidu.com'
    }
  ],
  style: {
    margin: marginCss,
    padding: paddingCss,
    font: fontCss
  }
};

(Carousel as any).schema = {
  autoplay: {
    type: 'switch',
    title: '自动播放'
  },
  dotPosition: {
    title: '指点位置',
    type: 'radio',
    options: ['top', 'bottom', 'left', 'right']
  },
  carousels: {
    type: 'children',
    min: 1,
    title: '轮播组',
    schema: {
      url: {
        title: '图片链接',
        type: 'img',
        width: 686,
        height: 180
      },
      link: {
        title: '跳转链接',
        type: 'text'
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
