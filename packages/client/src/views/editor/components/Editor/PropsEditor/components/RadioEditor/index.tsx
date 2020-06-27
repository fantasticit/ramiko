import React from 'react';
import { Input, Radio } from 'antd';
import style from './index.module.scss';

export const RadioEditor = ({ schema, value, onChange }) => {
  let { options = [] } = schema;
  options = options.map(option => {
    return typeof option === 'object'
      ? option
      : { label: option, value: option };
  });

  return (
    <div className={style.wrapper}>
      <span>
        {schema.title || '单选'}
        <span className={style.desc}>{schema.desc}</span>
      </span>
      <div>
        <Radio.Group
          onChange={e => {
            onChange(e.target.value);
          }}
          value={value}
        >
          {options.map(option => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      </div>
    </div>
  );
};
