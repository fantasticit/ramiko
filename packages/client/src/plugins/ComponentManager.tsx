import { plugins } from '@/views/editor';
import { Carousel } from './components/Carousel';
import { Cover } from './components/Cover';
import { Button } from './components/Button';
import { Paragraph } from './components/Paragraph';
import { BaseTitle, LeftBorderTitle } from './components/Title';
import { ImgTextTab } from './components/Tab';
import { Footer } from './components/Footer';
import { ImgTextList } from './components/List';

plugins.components.register('BaseTitle', BaseTitle);
plugins.components.register('LeftBorderTitle', LeftBorderTitle);
plugins.components.addToGroup('标题', ['BaseTitle', 'LeftBorderTitle']);

plugins.components.register('Cover', Cover);
plugins.components.addToGroup('配图', ['Cover']);

plugins.components.register('Carousel', Carousel);
plugins.components.addToGroup('轮播图', ['Carousel']);

plugins.components.register('Paragraph', Paragraph);
plugins.components.addToGroup('段落', ['Paragraph']);

plugins.components.register('Button', Button);
plugins.components.addToGroup('按钮', ['Button']);

plugins.components.register('ImgTextTab', ImgTextTab);
plugins.components.addToGroup('TAB', ['ImgTextTab']);

plugins.components.register('ImgTextList', ImgTextList);
plugins.components.addToGroup('列表', ['ImgTextList']);

plugins.components.register('Footer', Footer);
plugins.components.addToGroup('页脚', ['Footer']);
