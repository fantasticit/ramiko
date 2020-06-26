import React from 'react';
import clone from 'lodash/cloneDeep';
import set from 'lodash/set';
import { message, Button, Collapse, Space } from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { ColorEditor } from './components/ColorEditor';
import { ImgEditor } from './components/ImgEditor';
import { RadioEditor } from './components/RadioEditor';
import { SwitchEditor } from './components/SwitchEditor';
import { TextEditor } from './components/TextEditor';
import { TextareaEditor } from './components/TextareaEditor';
import style from './index.module.scss';

const { Panel } = Collapse;

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const genExtra = () => (
  <DeleteOutlined
    onClick={event => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }}
  />
);

const getTitleOrNameOfObj = obj => {
  if (typeof obj !== 'object') {
    return obj;
  }
  let k = Object.keys(obj).find(k => typeof obj[k] === 'string');
  return k ? obj[k] : '未能找到名称或标题';
};

const UnionEditor = ({ bindKey, value, schema, onChange: rootOnChange }) => {
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

            // <>
            //   <li data-index={index + 1} key={index}>
            //     <div className={style.toolboxWrapper}>
            //       {/* <div onClick={() => add(index)}>
            //         <PlusOutlined />
            //       </div> */}
            //       <div onClick={() => remove(index)}>
            //         <DeleteOutlined />
            //       </div>
            //     </div>
            //     {Object.keys(subSchema).map(key => {
            //       return renderEditorItem(
            //         key,
            //         v[key],
            //         subSchema[key],
            //         (key, newVal) => {
            //           set(rootNewValue, `${index}.${key}`, newVal);
            //           rootOnChange(rootNewValue);
            //         }
            //       );
            //     })}
            //     <Button
            //       icon={<PlusOutlined />}
            //       type="link"
            //       onClick={() => add(index)}
            //     >
            //       新增一项
            //     </Button>
            //   </li>
            // </>
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
      {...{ bindKey: key }}
    />
  );
};
