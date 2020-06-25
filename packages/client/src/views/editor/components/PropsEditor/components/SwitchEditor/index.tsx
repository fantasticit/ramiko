import React from 'react';
import { Switch } from 'antd';
import style from './index.module.scss';

export const SwitchEditor = ({ schema, value, onChange }) => {
  return (
    <div className={style.wrapper}>
      <span>{schema.label || '开关'}</span>
      <Switch checked={value} onChange={onChange} />
    </div>
  );
};
