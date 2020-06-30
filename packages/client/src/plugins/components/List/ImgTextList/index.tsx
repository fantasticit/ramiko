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
import chunk from 'lodash/chunk';
import style from './index.module.scss';

export const ImgTextList = ({
  items = [],
  spans,
  marginTop = 10,
  marginLeft = 10,
  style: commonStyle
}) => {
  const groups = chunk(items, spans);

  return (
    <div className={style.wrapper} style={transformStyle(commonStyle)}>
      {groups.map((group, i) => {
        return (
          <div
            className={style.row}
            key={i}
            style={{ marginTop: i > 0 ? marginTop : 0 }}
          >
            {group.map((item, j) => {
              return (
                <div
                  className={style.col}
                  key={i + '_' + j}
                  style={{
                    marginLeft: j > 0 ? marginLeft : 0
                  }}
                >
                  <a href={item.link}>
                    <div className={style.mask}></div>
                    <img src={item.cover} alt={item.title} />
                    <div className={style.content}>
                      <p className={style.title}>{item.title}</p>
                      <p className={style.subTitle}>{item.subTitle}</p>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

ImgTextList.defaultProps = {
  items: [
    {
      cover:
        'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-06-27/dGUxUULyLhgGvkwoNsHn.png',
      title: '俄罗斯',
      subTitle: '是个好地方',
      link: '/'
    },
    {
      cover:
        'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-06-27/dGUxUULyLhgGvkwoNsHn.png',
      title: '新西兰',
      subTitle: '也是个好地方',
      link: '/'
    },
    {
      cover:
        'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-06-27/dGUxUULyLhgGvkwoNsHn.png',
      title: '马来西亚',
      subTitle: 'WTF',
      link: '/'
    },
    {
      cover:
        'https://wipi.oss-cn-shanghai.aliyuncs.com/2020-06-27/dGUxUULyLhgGvkwoNsHn.png',
      title: '日本',
      subTitle: '呦西呦西',
      link: '/'
    }
  ],
  spans: 2,
  marginTop: 10,
  marginLeft: 10,
  style: {
    margin: marginCss,
    padding: paddingCss,
    font: fontCss
  }
};

(ImgTextList as any).schema = {
  items: {
    type: 'children',
    title: '列表',
    schema: {
      cover: {
        title: '图片链接',
        type: 'img',
        width: 686,
        height: 180
      },
      title: {
        title: '标题',
        type: 'text'
      },
      subTitle: {
        title: '副标题',
        type: 'text'
      },
      link: {
        title: '跳转链接',
        type: 'text'
      }
    }
  },
  spans: {
    title: '每行数量',
    type: 'number'
  },
  marginTop: {
    title: '上边距',
    type: 'number'
  },
  marginLeft: {
    title: '左边距',
    type: 'number'
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
