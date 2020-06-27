import React from 'react';

export const Tracking = ({ op, pageSn, pageElSn, children }) => {
  const onClick = () => {
    alert('埋点测试：' + op + '_' + pageSn + '_' + pageElSn);
  };

  return <div onClick={onClick}>{children}</div>;
};

Tracking.defaultProps = {
  op: 'click',
  pageSn: null,
  pageElSn: null
};

(Tracking as any).schema = {
  op: {
    title: '曝光方式',
    type: 'radio',
    options: ['click', 'pv']
  },
  pageSn: {
    title: '页面编号',
    type: 'number'
  },
  pageElSn: {
    title: '元素编号',
    type: 'number'
  }
};
