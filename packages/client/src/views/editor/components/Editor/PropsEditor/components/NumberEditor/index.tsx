import React from 'react';
import { InputNumber } from 'antd';
import style from './index.module.scss';

export const NumberEditor = ({ schema, value, onChange }) => {
  const { width, height } = schema;

  return (
    <div className={style.wrapper}>
      <span>{schema.label || '文本'}</span>
      <div>
        <InputNumber value={value} onChange={onChange} />
      </div>
    </div>
  );
};
