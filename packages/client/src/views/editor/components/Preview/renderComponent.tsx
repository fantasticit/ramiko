import { plugins } from '../../plugins';

const compose = (App, fns = []) => {
  return fns.reduce((a, fn) => fn(a), App);
};

export const renderComponent = ({ component, isEdit }) => {
  const { name, schema, fns = [], props } = component;
  const Component = plugins.components.get(name);

  if (!Component) {
    return null;
  }

  if (isEdit || !fns.length) {
    return <Component {...props} />;
  }

  const functions = fns
    .map(fn => {
      const props = fn.props;
      const Function = plugins.functions.get(fn.name);

      if (!Function) {
        return null;
      }

      return children => <Function {...props}>{children}</Function>;
    })
    .filter(Boolean);

  return compose(<Component {...props} />, functions);
};
