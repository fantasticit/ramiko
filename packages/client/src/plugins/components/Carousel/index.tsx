import React from 'react';
import { Carousel as ACarousel } from 'antd';
import style from './index.module.scss';

export const Carousel = ({ autoplay, dotPosition, carousels = [] }) => {
  return (
    <div className={style.wrapper}>
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
        'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-05-06/wallhaven-6kegww.jpg',
      link: 'http://www.baidu.com'
    },
    {
      url:
        'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-05-06/wallhaven-6kegww.jpg',
      link: 'http://www.baidu.com'
    },
    {
      url:
        'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-05-06/wallhaven-6kegww.jpg',
      link: 'http://www.baidu.com'
    }
  ]
};

(Carousel as any).schema = {
  autoplay: {
    type: 'switch',
    label: '自动播放'
  },
  dotPosition: {
    label: '指点位置',
    type: 'radio',
    options: ['top', 'bottom', 'left', 'right']
  },
  carousels: {
    type: 'children',
    min: 1,
    label: '轮播组',
    schema: {
      url: {
        label: '图片链接',
        type: 'img',
        width: 686,
        height: 180
      },
      link: {
        label: '跳转链接',
        type: 'text'
      }
    }
  }
};
