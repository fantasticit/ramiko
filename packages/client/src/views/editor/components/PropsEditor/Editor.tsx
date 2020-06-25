import React from 'react';
import clone from 'lodash/cloneDeep';
import set from 'lodash/set';
import { message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColorEditor } from './components/ColorEditor';
import { ImgEditor } from './components/ImgEditor';
import { RadioEditor } from './components/RadioEditor';
import { SwitchEditor } from './components/SwitchEditor';
import { TextEditor } from './components/TextEditor';
import { TextareaEditor } from './components/TextareaEditor';
import style from './index.module.scss';

const UnionEditor = ({ value, schema, onChange: rootOnChange }) => {
  const rootNewValue = clone(value);
  const { min = 1, max = Infinity, schema: subSchema } = schema;

  const add = index => {
    if (value.length >= max) {
      message.error(`最多${max}个.`);
      return;
    }

    const target = rootNewValue[index];
    rootOnChange([...rootNewValue, target]);
  };

  const remove = index => {
    if (value.length <= min) {
      message.error(`最少${min}个.`);
      return;
    }
    rootNewValue.splice(index, 1);
    rootOnChange(rootNewValue);
  };

  return (
    <div className={style.unioEditorWrapper}>
      <div>{schema.label || '组'}</div>
      <ul>
        {value.map((v, index) => {
          return (
            <li data-index={index + 1} key={index}>
              <div className={style.toolboxWrapper}>
                <div onClick={() => add(index)}>
                  <PlusOutlined />
                </div>
                <div onClick={() => remove(index)}>
                  <DeleteOutlined />
                </div>
              </div>
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
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const renderEditorItem = (key, propsValue, schema, onChange) => {
  if (!schema) {
    return null;
  }

  let TargetEditor = props => <p>未知组件类型</p>;

  switch (schema.type) {
    case 'color':
      TargetEditor = ColorEditor;
      break;

    case 'img':
      TargetEditor = ImgEditor;
      break;

    case 'radio':
      TargetEditor = RadioEditor;
      break;

    case 'switch':
      TargetEditor = SwitchEditor;
      break;

    case 'text':
      TargetEditor = TextEditor;
      break;

    case 'textarea':
      TargetEditor = TextareaEditor;
      break;

    case 'children':
      TargetEditor = UnionEditor as any;
      break;
  }

  return (
    <TargetEditor
      key={key}
      schema={schema}
      value={propsValue}
      onChange={v => onChange(key, v)}
    />
  );
};
