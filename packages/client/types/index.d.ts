import React from 'react';

interface IPluginComponent extends React.FC {
  schema: Record<string, Record<string, any>>;
}
