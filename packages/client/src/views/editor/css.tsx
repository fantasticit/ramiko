import React from 'react';

export const fontCss: React.CSSProperties = {
  fontSize: 14,
  color: '#333',
  textAlign: 'left'
};
export const fontCssSchema = {
  title: '字体',
  fontSize: {
    title: '大小',
    type: 'number'
  },
  color: {
    title: '颜色',
    type: 'color'
  },
  textAlign: {
    title: '对齐方式',
    type: 'radio',
    options: ['left', 'center', 'right']
  }
};

export const paddingCss: React.CSSProperties = {
  paddingTop: 8,
  paddingRight: 8,
  paddingBottom: 8,
  paddingLeft: 8
};
export const paddingCssSchema = {
  title: '内边距',
  paddingTop: {
    title: '上边距',
    type: 'number',
    min: 0
  },
  paddingRight: {
    title: '右边距',
    type: 'number',
    min: 0
  },
  paddingBottom: {
    title: '下边距',
    type: 'number',
    min: 0
  },
  paddingLeft: {
    title: '左边距',
    type: 'number',
    min: 0
  }
};

export const marginCss: React.CSSProperties = {
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0
};
export const marginCssSchema = {
  title: '外边距',
  marginTop: {
    title: '上边距',
    type: 'number',
    min: 0
  },
  marginRight: {
    title: '右边距',
    type: 'number',
    min: 0
  },
  marginBottom: {
    title: '下边距',
    type: 'number',
    min: 0
  },
  marginLeft: {
    title: '左边距',
    type: 'number',
    min: 0
  }
};

export const transformStyle = style => {
  const ret = {} as any;

  if (style.font) {
    Object.assign(ret, style.font);
  }

  if (style.padding) {
    ret.padding = ``;
    void ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'].forEach(
      key => {
        ret.padding += ' ' + style.padding[key] + 'px';
      }
    );
  }

  if (style.margin) {
    ret.margin = ``;
    void ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'].forEach(
      key => {
        ret.margin += ' ' + style.margin[key] + 'px';
      }
    );
  }

  return ret;
};
