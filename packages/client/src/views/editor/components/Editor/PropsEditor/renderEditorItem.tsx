import React from 'react';
import { ColorEditor } from './components/ColorEditor';
import { ImgEditor } from './components/ImgEditor';
import { NumberEditor } from './components/NumberEditor';
import { RadioEditor } from './components/RadioEditor';
import { SwitchEditor } from './components/SwitchEditor';
import { TextEditor } from './components/TextEditor';
import { TextareaEditor } from './components/TextareaEditor';
import { UnionEditor } from './UnionEditor';

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

    case 'number':
      TargetEditor = NumberEditor;
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
