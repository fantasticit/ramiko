/// <reference types="next" />
/// <reference types="next/types/global" />

import React from 'react';

declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

interface IPluginComponent extends React.FC {
  schema: Record<string, Record<string, any>>;
}
