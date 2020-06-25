import { Store } from './Store';
import { Carousel } from './components/Carousel';
import { Cover } from './components/Cover';
import { Button } from './components/Button';
import { Paragraph } from './components/Paragraph';
import { BaseTitle, LeftBorderTitle } from './components/Title';
import { ImgTextTab } from './components/Tab';
import { Footer } from './components/Footer';

export const components = new Store();

components.register('BaseTitle', BaseTitle);
components.register('LeftBorderTitle', LeftBorderTitle);
components.register('Cover', Cover);
components.register('Carousel', Carousel);
components.register('Paragraph', Paragraph);
components.register('Button', Button);
components.register('Footer', Footer);
components.register('ImgTextTab', ImgTextTab);

components.addToGroup('标题', ['BaseTitle', 'LeftBorderTitle']);
components.addToGroup('TAB', ['ImgTextTab']);
components.addToGroup('配图', ['Cover']);
components.addToGroup('轮播图', ['Carousel']);
components.addToGroup('段落', ['Paragraph']);
components.addToGroup('按钮', ['Button']);
components.addToGroup('页脚', ['Footer']);

export default {
  components
};
