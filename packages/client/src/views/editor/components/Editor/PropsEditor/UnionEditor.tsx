import React from 'react';
import clone from 'lodash/cloneDeep';
import set from 'lodash/set';
import { message, Collapse } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { renderEditorItem } from './renderEditorItem';
import style from './index.module.scss';

const { Panel } = Collapse;

const getTitleOrNameOfObj = obj => {
  if (typeof obj !== 'object') {
    return obj;
  }
  let k = Object.keys(obj).find(k => typeof obj[k] === 'string');
  return k ? obj[k] : '未能找到名称或标题';
};

export const UnionEditor = ({
  bindKey,
  value,
  schema,
  onChange: rootOnChange
}) => {
  const rootNewValue = clone(value);
  const { min = 1, max = Infinity, schema: subSchema } = schema;

  const add = () => {
    if (value.length >= max) {
      message.error(`最多${max}个.`);
      return;
    }
    const target = clone(rootNewValue[value.length - 1]);
    rootOnChange([...rootNewValue, target]);
  };

  const remove = index => {
    if (value.length <= min) {
      message.error(`最少${min}个.`);
      return;
    }
    const newValue = clone(rootNewValue);
    newValue.splice(index, 1);
    rootOnChange(newValue);
  };

  return (
    <div className={style.unioEditorWrapper}>
      <div className={style.title}>{schema.label || '组'}</div>
      <Collapse expandIconPosition={'right'} bordered={false} accordion>
        {value.map((v, index) => {
          const key = bindKey + '_' + index;
          return (
            <Panel
              header={
                <span className={style.pannellHeader}>
                  {getTitleOrNameOfObj(v)}
                </span>
              }
              key={key}
              extra={
                <DeleteOutlined
                  onClick={event => {
                    event.stopPropagation();
                    remove(index);
                  }}
                />
              }
            >
              {Object.keys(subSchema).map(key => {
                return renderEditorItem(
                  key,
                  v[key],
                  subSchema[key],
                  (key, newVal) => {
                    set(rootNewValue, `${index}.${key}`, newVal);
                    rootOnChange(rootNewValue);
                  }
                );
              })}
            </Panel>
          );
        })}
        <a className={style.more} onClick={add}>
          <PlusOutlined />
          新增一项
        </a>
      </Collapse>
    </div>
  );
};
