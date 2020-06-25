import React from 'react';
import { Input, Avatar } from 'antd';
import style from './index.module.scss';

export const TextareaEditor = ({ schema, value, onChange }) => {
  const { width, height } = schema;

  return (
    <div className={style.wrapper}>
      <p>{schema.label || '文本'}</p>
      <div>
        <Input.TextArea
          value={value}
          rows={6}
          onChange={e => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};
