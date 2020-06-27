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

  const removeOfArray = index => {
    if (value.length <= min) {
      message.error(`最少${min}个.`);
      return;
    }
    const newValue = clone(rootNewValue);
    newValue.splice(index, 1);
    rootOnChange(newValue);
  };

  const removeOfObject = key => {
    const newValue = clone(rootNewValue);
    delete newValue[key];
    rootOnChange(newValue);
  };

  if (!value || !subSchema) {
    return null;
  }

  if (!Array.isArray(value)) {
    return (
      <div className={style.unioEditorWrapper}>
        <div className={style.title}>{schema.title || '组'}</div>
        <Collapse expandIconPosition={'right'} bordered={false} accordion>
          {Object.keys(value).map(key => {
            return value[key] && typeof value[key] === 'object' ? (
              <Panel
                header={
                  <span className={style.pannellHeader}>
                    {subSchema[key].title || '组'}
                  </span>
                }
                key={key}
              >
                {Object.keys(value[key]).map(subKey => {
                  return renderEditorItem(
                    subKey,
                    value[key][subKey],
                    subSchema[key][subKey],
                    (subKey, newVal) => {
                      set(rootNewValue, `${key}.${subKey}`, newVal);
                      rootOnChange(rootNewValue);
                    }
                  );
                })}
              </Panel>
            ) : (
              <Panel
                header={
                  <span className={style.pannellHeader}>
                    {subSchema.title || '组'}
                  </span>
                }
                key={key}
              >
                {renderEditorItem(
                  key,
                  value[key],
                  subSchema[key],
                  (key, newVal) => {
                    set(rootNewValue, `${key}`, newVal);
                    rootOnChange(rootNewValue);
                  }
                )}
              </Panel>
            );
          })}
        </Collapse>

        {/* </Panel> */}
      </div>
    );
  }

  return (
    <div className={style.unioEditorWrapper}>
      <div className={style.title}>{schema.title || '组'}</div>
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
                    removeOfArray(index);
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
