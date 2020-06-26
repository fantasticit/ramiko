import React from 'react';
import { Input, Avatar } from 'antd';
import style from './index.module.scss';

export const ImgEditor = ({ schema, value, onChange }) => {
  const { width, height } = schema;

  return (
    <div className={style.wrapper}>
      <p>
        {schema.label || '图片'}
        <span>
          建议尺寸
          {width}*{height}
        </span>
      </p>
      <div className={style.imgWrapper}>
        <img src={value} />
        <span>{value}</span>
      </div>
      <div>
        <Input value={value} onChange={e => onChange(e.target.value)}></Input>
      </div>
    </div>
  );
};
