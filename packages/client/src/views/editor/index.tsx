import { renderComponent } from './components/Preview/renderComponent';
import { plugins } from './plugins';
import { Editor } from './Editor';

const renderPage = ({ components = [] }) => {
  return (
    <div>
      {components.map(component => {
        return renderComponent({ component, isEdit: false });
      })}
    </div>
  );
};

export { renderPage, plugins, Editor };
