import React from 'react';
import { InputNumber } from 'antd';
import style from './index.module.scss';

export const NumberEditor = ({ schema, value, onChange }) => {
  const { min = -Infinity } = schema;

  return (
    <div className={style.wrapper}>
      <span>
        {schema.title || '文本'}
        <span className={style.desc}>{schema.desc}</span>
      </span>
      <div>
        <InputNumber value={value} onChange={onChange} min={min} />
      </div>
    </div>
  );
};
