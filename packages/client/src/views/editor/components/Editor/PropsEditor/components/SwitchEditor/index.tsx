import React from 'react';
import { Switch } from 'antd';
import style from './index.module.scss';

export const SwitchEditor = ({ schema, value, onChange }) => {
  return (
    <div className={style.wrapper}>
      <span>
        {schema.title || '开关'}
        <span className={style.desc}>{schema.desc}</span>
      </span>
      <Switch checked={value} onChange={onChange} />
    </div>
  );
};
